import { keyboard, mouse } from 'easy-web-input';
import { remove } from '@reverse/array';

import getModuleFromString from '../utils/get-module';
import { getMouseGridPos } from '../utils/mouse';
import { disableWiring, toggleWiring, isWiring } from './wiring';

import { MouseCoordinates } from '../types/types';

import { state } from './logic';
import { ctx } from './canvas';

import SwitchModule from './modules/SwitchModule';
import LightModule from './modules/LightModule';

export let startClick = { x: 0, y: 0 };
export let mousePos: MouseCoordinates;

export default function doInput() {
  mousePos = getMouseGridPos();

  // Check for zoom input.
  if(keyboard.NumpadAdd) {
    state.gridSize++;
  }
  if(keyboard.NumpadSubtract) {
    state.gridSize--;
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
  }
  if(keyboard.Digit2Pressed) {
    state.moduleInHand = LightModule;
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

    startClick.x = mouse.x;
    startClick.y = mouse.y;
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

  if(mouse.left) {
    if(isWiring) {
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.moveTo(startClick.x, startClick.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.lineWidth = 3 * (state.gridSize / 64);
      ctx.stroke();
    }
  }
  if(mouse.leftReleased && isWiring) {
    const startingMousePos = getMouseGridPos(startClick.x, startClick.y);

    const startingModule = state.modules.find((moudle) => {
      return moudle.x === startingMousePos.x && moudle.y === startingMousePos.y;
    });
    const endingModule = state.modules.find((moudle) => {
      return moudle.x === mousePos.x && moudle.y === mousePos.y;
    });

    // If the IO is right.
    if(
      (startingModule && endingModule)
      && (startingModule.accepts.output.accept && endingModule.accepts.input.accept)
    ) {
      // If they are already connected.
      if(startingModule.outputs.includes(endingModule.id) && endingModule.inputs.includes(startingModule.id)) {
        startingModule.outputs = remove(startingModule.outputs, endingModule.id);
        endingModule.inputs = remove(endingModule.inputs, startingModule.id);
      }else if(
      // If there is room for another conenction.
        startingModule.outputs.length + 1 < startingModule.accepts.output.count
        && endingModule.inputs.length + 1 < endingModule.accepts.input.count
      ) {
        startingModule.outputs.push(endingModule.id);
        endingModule.inputs.push(startingModule.id);

      }

      endingModule.doLogic();
    }
  }
}
