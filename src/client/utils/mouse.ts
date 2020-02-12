import { mouse } from 'easy-web-input';

import { canvas } from '../logic/canvas';
import { state } from '../logic/logic';

export function getMouseGridPos(x: number = mouse.x, y: number = mouse.y) {
  const mousePos = { x: 0, y: 0 };

  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / state.gridSize); i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / state.gridSize); j++) {
      if(
        x >= j * state.gridSize
        && x <= j * state.gridSize + state.gridSize
        && y >= i * state.gridSize
        && y <= i * state.gridSize + state.gridSize
      ) {
        mousePos.x = j;
        mousePos.y = i;
      }
    }
  }

  return mousePos;
}
