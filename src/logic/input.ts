import { keyboard, mouse } from 'easy-web-input';
import { remove } from '@reverse/array';
import { saveAs } from 'file-saver';

import getModuleFromString from '../utils/get-module';
import { getMouseGridPos } from '../utils/mouse';
import { disableWiring, toggleWiring, isWiring } from './wiring';
import { updateModule } from './update';
import { toSaveFormat, loadSave } from './saving';

import { MouseCoordinates } from '../types/types';

import { state } from './logic';

import SwitchModule from './modules/inputs/SwitchModule';
import ClockModule from './modules/inputs/ClockModule';
import ButtonModule from './modules/inputs/ButtonModule';

import LampModule from './modules/outputs/LampModule';

import AndModule from './modules/gates/AndModule';
import NandModule from './modules/gates/NandModule';
import OrModule from './modules/gates/OrModule';
import NorModule from './modules/gates/NorModule';
import NotModule from './modules/gates/NotModule';
import XorModule from './modules/gates/XorModules';
import XnorModule from './modules/gates/XnorModule';

export let mousePos: MouseCoordinates;

export const startDragPos: MouseCoordinates = { x: 0, y: 0 };
export const startDragCameraPos: MouseCoordinates = { x: 0, y: 0 };

export default function doInput() {
  mousePos = getMouseGridPos();

  if(keyboard.BracketLeft) {
    if(state.camera.wireOpacity > 0) {
      state.camera.wireOpacity -= 0.05;
    }
  }
  if(keyboard.BracketRight) {
    if(state.camera.wireOpacity < 1) {
      state.camera.wireOpacity += 0.05;
    }
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
        state.moduleInHand = getModuleFromString(hoveredMoudle.type);
      }
    }

    disableWiring();
  }

  // Check for wire input.
  if(keyboard.ePressed) {
    state.moduleInHand = null;

    toggleWiring();
  }

  if(keyboard.BackquotePressed) {
    state.moduleInHand = ClockModule;
    disableWiring();
  }
  // Check for module hotkeys pressed.
  if(keyboard.Digit1Pressed) {
    if(keyboard.Shift) {
      state.moduleInHand = ButtonModule;
    }else {
      state.moduleInHand = SwitchModule;
    }
    disableWiring();
  }
  if(keyboard.Digit2Pressed) {
    state.moduleInHand = LampModule;
    disableWiring();
  }
  if(keyboard.Digit3Pressed) {
    if(keyboard.Shift) {
      state.moduleInHand = NandModule;
    }else {
      state.moduleInHand = AndModule;
    }
    disableWiring();
  }
  if(keyboard.Digit4Pressed) {
    if(keyboard.Shift) {
      state.moduleInHand = NorModule;
    }else {
      state.moduleInHand = OrModule;
    }
    disableWiring();
  }
  if(keyboard.Digit5Pressed) {
    state.moduleInHand = NotModule;
    disableWiring();
  }
  if(keyboard.Digit6Pressed) {
    if(keyboard.Shift) {
      state.moduleInHand = XnorModule;
    }else {
      state.moduleInHand = XorModule;
    }
    disableWiring();
  }

  // Saving and loading.
  if(keyboard.iPressed) {
    const save = window.prompt('Paste below your save data.');


    if(save) {
      loadSave(JSON.parse(window.atob(save)));
    }
  }
  if(keyboard.oPressed) {
    const save = new Blob([window.btoa(JSON.stringify(toSaveFormat()))], {type: 'text/plain;charset=utf-8'});

    saveAs(save, `lgsw-${new Date().toISOString()}.txt`);
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
          updateModule(outputtedModule.id);
        }
      });

      state.modules = remove(state.modules, moduleToDelete);
    }
  }

  // Camvas Panning
  if(mouse.middlePressed) {
    startDragPos.x = mouse.x;
    startDragPos.y = mouse.y;

    startDragCameraPos.x = state.camera.x;
    startDragCameraPos.y = state.camera.y;
  }
  if(mouse.middle) {
    state.camera.x = startDragCameraPos.x + ((startDragPos.x - mouse.x) / (state.gridSize * state.camera.scale));
    state.camera.y = startDragCameraPos.y + ((startDragPos.y - mouse.y) / (state.gridSize * state.camera.scale));
  }
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
  
  // Canvas Zooming
  if(mouse.scrollY) {
    state.camera.scale = Math.min(Math.max(state.camera.scale - (mouse.scrollY / 15), 0.25), 4);
  }
  if(keyboard.NumpadAdd) {
    if(state.camera.scale < 4) {
      state.camera.scale += 0.05;
    }
  }
  if(keyboard.NumpadSubtract) {
    if(state.camera.scale > 0.25) {
      state.camera.scale -= 0.05;
    }
  }

  state.camera.wireOpacity = Math.round(state.camera.wireOpacity * 100) / 100;
}
