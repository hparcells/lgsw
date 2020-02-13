import { keyboard, mouse } from 'easy-web-input';
import { remove } from '@reverse/array';

import getModuleFromString from '../utils/get-module';
import { getMouseGridPos } from '../utils/mouse';
import { disableWiring, toggleWiring, isWiring } from './wiring';

import { MouseCoordinates } from '../types/types';

import { state } from './logic';

import SwitchModule from './modules/SwitchModule';
import LightModule from './modules/LightModule';

export let mousePos: MouseCoordinates;

export default function doInput() {
  mousePos = getMouseGridPos();

  if(keyboard.ArrowUp) {
    state.camera.y -= 0.5;
  }
  if(keyboard.ArrowRight) {
    state.camera.x += 0.5;
  }
  if(keyboard.ArrowDown) {
    state.camera.y += 0.5;
  }
  if(keyboard.ArrowLeft) {
    state.camera.x -= 0.5;
  }

  // Check for zoom input.
  if(keyboard.NumpadAdd) {
    if(state.camera.scale < 4) {
      state.camera.scale += 0.05;
    }
  }
  if(keyboard.NumpadSubtract) {
    if(state.camera.scale > 0.25)
    state.camera.scale -= 0.05;
  }

  // Check for deselect input.
  if(keyboard.qPressed) {
    if(state.moduleInHand) {
      state.moduleInHand = null;
    }else {
      const hoveredMoudle = state.modules.find((module) => {
        return module.x === mousePos.x && module.y === mousePos.y;
      });

      if(hoveredMoudle) {
        state.moduleInHand = getModuleFromString(hoveredMoudle.moduleName);
      }
    }

    disableWiring();
  }

  // Check for wire input.
  if(keyboard.ePressed) {
    state.moduleInHand = null;

    toggleWiring();
  }

  // Check for module hotkeys pressed.
  if(keyboard.Digit1Pressed) {
    state.moduleInHand = SwitchModule;
    disableWiring();
  }
  if(keyboard.Digit2Pressed) {
    state.moduleInHand = LightModule;
    disableWiring();
  }

  if(mouse.leftPressed) {
    if(state.moduleInHand) {
      if(!state.modules.find((module) => {
        return module.x === mousePos.x && module.y === mousePos.y;
      })) {
        state.modules.push(new state.moduleInHand(mousePos.x, mousePos.y));
      }
    }else if(!isWiring) {
      const interactedModule = state.modules.find((moudle) => {
        return moudle.x === mousePos.x && moudle.y === mousePos.y;
      });
      interactedModule?.onClick();
    }
  }

  // Check for right click.
  if(mouse.right) {
    const moduleToDelete = state.modules.find((module) => {
      return module.x === mousePos.x && module.y === mousePos.y;
    });

    if(moduleToDelete) {
      moduleToDelete.inputs.forEach((inputtedModuleId) => {
        const inputtedMoudle = state.modules.find((moudle) => {
          return moudle.id === inputtedModuleId;
        });

        if(inputtedMoudle) {
          inputtedMoudle.outputs = remove(inputtedMoudle.outputs, moduleToDelete.id);
        }
      });
      moduleToDelete.outputs.forEach((outputtedModuleId) => {
        const outputtedModule = state.modules.find((moudle) => {
          return moudle.id === outputtedModuleId;
        });

        if(outputtedModule) {
          outputtedModule.inputs = remove(outputtedModule.inputs, moduleToDelete.id);
          outputtedModule.doLogic();
        }
      });

      state.modules = remove(state.modules, moduleToDelete);
    }
  }
}
