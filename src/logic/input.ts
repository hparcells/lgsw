import { keyboard, mouse } from 'easy-web-input';
import { remove } from '@reverse/array';
import { saveAs } from 'file-saver';
import isJSON from 'is-json';
import isBase64 from 'is-base64';
import uuid from 'uuid';

import getModuleFromString from '../utils/get-module';
import { getMouseGridPos } from '../utils/mouse';
import { updateModule } from './update';
import { toSaveFormat, loadSave } from './saving';
import { doClipboardInput } from './clipboard';

import { MouseCoordinates, SaveModule } from '../types/types';

import { state } from './logic';

export let mousePos: MouseCoordinates;

export const startDragPos: MouseCoordinates = { x: 0, y: 0 };
export const startDragCameraPos: MouseCoordinates = { x: 0, y: 0 };

export default function doInput() {
  mousePos = getMouseGridPos();

  // Check for left pressed.
  if(mouse.leftPressed) {
    if(state.inHand.length > 0) {
      if(!state.inHand.map((inHandModule) => {
        return !!state.modules.find((module) => {
          return module.x === inHandModule.x + mousePos.x && module.y === inHandModule.y + mousePos.y;
        });
      }).includes(true)) {
        let placementQueue: SaveModule[] = JSON.parse(JSON.stringify(state.inHand));

        const idMap: { [type: string]: string } = {};

        // Generate new Ids.
        placementQueue.forEach((queuedModule) => {
          idMap[queuedModule.id] = uuid();
        });

        // Update references and stuff.
        placementQueue.forEach((queuedModule, index) => {
          // Update inputs.
          queuedModule.inputs.map((inputId) => {
            return placementQueue.find((queueModule) => {
              return queueModule.id === inputId;
            });
          }).forEach((inputModule) => {
            if(inputModule) {
              const moduleIdIndex = inputModule.outputs.indexOf(placementQueue[index].id);
              return inputModule.outputs[moduleIdIndex] = idMap[queuedModule.id];
            }
          });

          // Update outputs.
          queuedModule.outputs.map((outputId) => {
            return placementQueue.find((queueModule) => {
              return queueModule.id === outputId;
            });
          }).forEach((outputModule) => {
            if(outputModule) {
              const moduleIdIndex = outputModule.inputs.indexOf(placementQueue[index].id);
              
              return outputModule.inputs[moduleIdIndex] = idMap[queuedModule.id];
            }
          });

          queuedModule.id = idMap[queuedModule.id];
        });

        // Place them.
        placementQueue.forEach((queuedModule) => {
          const moduleClass = getModuleFromString(queuedModule.type);
          const placedModule = new moduleClass(mousePos.x + queuedModule.x, mousePos.y + queuedModule.y);

          placedModule.id = queuedModule.id;
          placedModule.inputs = queuedModule.inputs;
          placedModule.outputs = queuedModule.outputs;
          placedModule.on = queuedModule.on;
          
          state.modules.push(placedModule);
          updateModule(placedModule.id);
        });
      }
    }else if(state.mode === 'normal') {
      const interactedModule = state.modules.find((moudle) => {
        return moudle.x === mousePos.x && moudle.y === mousePos.y;
      });
      interactedModule?.onClick();
    }else if(['copy', 'cut', 'delete'].includes(state.mode)) {
      startDragPos.x = mousePos.x;
      startDragPos.y = mousePos.y;
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

  // Check for deselect input.
  if(keyboard.qPressed) {
    if(state.inHand.length > 0) {
      state.inHand = [];
    }else {
      const hoveredMoudle = state.modules.find((module) => {
        return module.x === mousePos.x && module.y === mousePos.y;
      });

      if(hoveredMoudle) {
        state.inHand.push({
          type: hoveredMoudle.type,
          id: '0',
          x: 0,
          y: 0,
          on: false,
          inputs: [],
          outputs: []
        });
      }
    }

    state.mode = 'normal';
  }

  // #region Mode Toggling
  // Check for wire input.
  if(keyboard.ePressed) {
    state.inHand = [];

    if(state.mode === 'wiring') {
      state.mode = 'normal';
    }else {
      state.mode = 'wiring';
    }
  }
  // #endregion

  // #region Module Hotkeys
  if(keyboard.BackquotePressed) {
    state.inHand = [];

    state.inHand.push({
      type: 'clock',
      id: '0',
      x: 0,
      y: 0,
      on: false,
      inputs: [],
      outputs: []
    });
    state.mode = 'normal';
  }
  // Check for module hotkeys pressed.
  if(keyboard.Digit1Pressed) {
    state.inHand = [];

    if(keyboard.Shift) {
      state.inHand.push({
        type: 'button',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }else {
      state.inHand.push({
        type: 'switch',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }
    state.mode = 'normal';
  }
  if(keyboard.Digit2Pressed) {
    state.inHand = [];

    state.inHand.push({
      type: 'lamp',
      id: '0',
      x: 0,
      y: 0,
      on: false,
      inputs: [],
      outputs: []
    });
    state.mode = 'normal';
  }
  if(keyboard.Digit3Pressed) {
    state.inHand = [];

    if(keyboard.Shift) {
      state.inHand.push({
        type: 'nand',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }else {
      state.inHand.push({
        type: 'and',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }
    state.mode = 'normal';
  }
  if(keyboard.Digit4Pressed) {
    state.inHand = [];

    if(keyboard.Shift) {
      state.inHand.push({
        type: 'nor',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }else {
      state.inHand.push({
        type: 'or',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }
    state.mode = 'normal';
  }
  if(keyboard.Digit5Pressed) {
    state.inHand = [];

    state.inHand.push({
      type: 'not',
      id: '0',
      x: 0,
      y: 0,
      on: false,
      inputs: [],
      outputs: []
    });
    state.mode = 'normal';
  }
  if(keyboard.Digit6Pressed) {
    state.inHand = [];

    if(keyboard.Shift) {
      state.inHand.push({
        type: 'xnor',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }else {
      state.inHand.push({
        type: 'xor',
        id: '0',
        x: 0,
        y: 0,
        on: false,
        inputs: [],
        outputs: []
      });
    }
    state.mode = 'normal';
  }
  // #endregion 

  // #region Saving and loading.
  if(keyboard.iPressed) {
    const save = window.prompt('Paste below your save data.');

    if(save && isBase64(save)) {
      const decoded = window.atob(save);

      if(isJSON(decoded)) {
        loadSave(JSON.parse(decoded));
        
        return;
      }
    }

    window.alert('Inputted save is not parsable. If you feel this is wrong open an issue at https://github.com/hparcells/lgsw/issues/.\n\nError Code: 1.');
  }
  if(keyboard.oPressed) {
    const save = new Blob([window.btoa(JSON.stringify(toSaveFormat()))], { type: 'text/plain;charset=utf-8' });

    saveAs(save, `lgsw-${new Date().toISOString()}.txt`);
  }
  // #endregion

  // #region Camvas Panning
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
  // #endregion
  
  // #region Canvas Zooming
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
  // #endregion

  // #region Wire Opacity
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
  // #endregion

  state.camera.wireOpacity = Math.round(state.camera.wireOpacity * 100) / 100;
  
  doClipboardInput();
}
