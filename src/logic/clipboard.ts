import { mouse, keyboard } from 'easy-web-input';
import { remove } from '@reverse/array';

import { toSaveModule } from './saving';

import { state } from './logic';
import { startDragPos, mousePos } from './input';

export function doClipboardInput() {
  // Check for mode switching.
  if(keyboard.cPressed && keyboard.Control) {
    state.inHand = [];

    if(state.mode === 'copy') {
      state.mode = 'normal';
    }else {
      state.mode = 'copy';
    }
  }
  if(keyboard.xPressed && keyboard.Control) {
    state.inHand = [];

    if(state.mode === 'cut') {
      state.mode = 'normal';
    }else {
      state.mode = 'cut';
    }
  }
  if(keyboard.vPressed && keyboard.Control) {
    state.inHand = JSON.parse(JSON.stringify(state.clipboard));
  }
  if(keyboard.zPressed && keyboard.Control) {
    state.inHand = [];

    if(state.mode === 'delete') {
      state.mode = 'normal';
    }else {
      state.mode = 'delete';
    }
  }

  // Check for copy and cut selection.
  if(['copy', 'cut', 'delete'].includes(state.mode)) {
    if(mouse.leftReleased) {
      state.clipboard = [];

      let reduceAmount = { x: 0, y: 0 };
  
      state.modules.filter((module) => {
        return module.x >= Math.min(startDragPos.x, mousePos.x)
          && module.y >= Math.min(startDragPos.y, mousePos.y)
          && module.x <= Math.max(startDragPos.x, mousePos.x)
          && module.y <= Math.max(startDragPos.y, mousePos.y);
      }).sort((a, b) => {
        return a.x - b.x || a.y - b.y;
      }).forEach((module, index) => {
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
