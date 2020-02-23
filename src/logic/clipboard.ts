import { mouse, keyboard } from 'easy-web-input';
import { remove } from '@reverse/array';
import { saveAs } from 'file-saver';

import { toSaveModule } from './saving';
import { toggleMode } from '../utils/toggle-mode';

import { Schematic } from '../types/types';

import { state } from './logic';
import { startDragPos, mousePos } from './input';
import { canvas } from './canvas';

export function checkClipboardInput() {
  // Check for mode switching.
  if(keyboard.cPressed && keyboard.Control) {
    toggleMode('copy');

    if(state.mode === 'copy') {
      canvas.style.cursor = 'copy';
    }else {
      canvas.style.cursor = 'default';
    }
  }
  if(keyboard.xPressed && keyboard.Control) {
    toggleMode('cut');
  }
  if(keyboard.vPressed && keyboard.Control) {
    state.mode = 'normal';
    canvas.style.cursor = 'default';
    state.inHand = JSON.parse(JSON.stringify(state.clipboard));
  }
  if(keyboard.zPressed && keyboard.Control) {
    toggleMode('delete');

    if(state.mode === 'delete') {
      canvas.style.cursor = 'not-allowed';
    }else {
      canvas.style.cursor = 'default';
    }
  }

  // Check for transformations.
  if(state.inHand.length > 1) {
    // Rotation.
    if(keyboard.rPressed && keyboard.Shift) {
      state.inHand.forEach((module) => {
        const startingX = module.x;
        const startingY = module.y;

        module.x = startingY;
        module.y = -startingX;

        return;
      });
    }else if(keyboard.rPressed) {
      state.inHand.forEach((module) => {
        const startingX = module.x;
        const startingY = module.y;

        module.x = -startingY;
        module.y = startingX;

        return;
      });
    }

    // Schematic output.
    if(keyboard.oPressed) {
      if(state.inHand.length > 1) {
        const author = window.prompt('Enter an author name for this schematic.', 'Anonymous');
  
        if(!author) {
          return;
        }
  
        const schematic: Schematic = {
          author,
          modules: state.inHand
        }
        const save = new Blob([window.btoa(JSON.stringify(schematic))], { type: 'text/plain;charset=utf-8' });
  
        saveAs(save, `lgsw-schematic-${new Date().toISOString()}.txt`);
      }
    }
  }

  // Check for copy and cut selection.
  if(['copy', 'cut', 'delete'].includes(state.mode)) {
    if(mouse.leftReleased) {
      const affectedModules = state.modules.filter((module) => {
        return module.x >= Math.min(startDragPos.x, mousePos.x)
          && module.y >= Math.min(startDragPos.y, mousePos.y)
          && module.x <= Math.max(startDragPos.x, mousePos.x)
          && module.y <= Math.max(startDragPos.y, mousePos.y);
      }).sort((a, b) => {
        return a.x - b.x || a.y - b.y;
      });
        
      if(affectedModules.length > 0) {
        let reduceAmount = { x: 0, y: 0 };

        if(state.mode !== 'delete') {
          state.clipboard = [];
        }

        affectedModules.forEach((module, index) => {
          if(index === 0) {
            reduceAmount.x = module.x;
            reduceAmount.y = module.y;
          }
    
          let saveModule = toSaveModule(module);
          saveModule.x -= reduceAmount.x;
          saveModule.y -= reduceAmount.y;
    
          if(state.mode !== 'delete') {
            state.clipboard.push(saveModule);
          }
  
          if(state.mode === 'cut' || state.mode === 'delete') {
            state.modules = remove(state.modules, module);
          }
        });
  
        if(state.mode !== 'delete') {
          state.inHand = JSON.parse(JSON.stringify(state.clipboard));
          state.mode = 'normal';
        }
      }
    }
  }
}
