import { mouse } from 'easy-web-input';

import { shouldDrawHoveredTile } from './wiring';
import { state } from './logic';
import { ctx, canvas } from './canvas';
import { mousePos } from './input';

export function cleanCanvas() {
  // Clean the entire canvas.
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function renderGrid() {
  // Draw the grid.
  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / state.gridSize); i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / state.gridSize); j++) {
      if(i % 2 === 0 && j % 2 === 0) {
        ctx.fillStyle = '#757575';
      }else if(i % 2 === 0) {
        ctx.fillStyle = '#A0A0A0  ';
      }else if(j % 2 === 0) {
        ctx.fillStyle = '#A0A0A0';
      }else {
        ctx.fillStyle = '#757575';
      }
      
      // Draw something/
      ctx.fillRect(
        j * state.gridSize,
        i * state.gridSize,
        state.gridSize,
        state.gridSize
      );
    }
  }
}

export function renderCursor() {
  // If we have a module in our hand.
  if(state.moduleInHand) {
    ctx.globalAlpha = 0.5;

    // Render the moudle in hand.
    new state.moduleInHand(mousePos.x, mousePos.y).render();

    ctx.globalAlpha = 1;
  }else if(shouldDrawHoveredTile) {
    // Draw the hovered tile.
    // For each row.
    for(let i = 0; i < Math.ceil(canvas.height / state.gridSize * 1.5); i++) {
      // For each column.
      for(let j = 0; j < Math.ceil(canvas.width / state.gridSize) * 1.5; j++) {
        if(
          mouse.x >= j * state.gridSize
          && mouse.x <= j * state.gridSize + state.gridSize
          && mouse.y >= i * state.gridSize
          && mouse.y <= i * state.gridSize + state.gridSize
        ) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.25)';
  
          ctx.fillRect(
            j * state.gridSize,
            i * state.gridSize,
            state.gridSize,
            state.gridSize
          );
        }
      }
    }
  }
}

export function renderObjects() {
  // Render all the objects.
  state.modules.forEach((object) => {
    return object.render();
  });
}
