import { updateInputManager, mouse, keyboard } from 'easy-web-input';

import { GameState } from '../types/types';

import SwitchMoudle from './modules/SwitchModule';

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

export const state: GameState = {
  objects: [],
  gridSize: 64
}

/** The game loop. */
function gameLoop() {
  // Clean the entire canvas.
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Resize the canvas when we resize the canvas.
  window.addEventListener('resize', () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });

  // Check for zoom input.
  if(keyboard.NumpadAdd) {
    state.gridSize++;
  }
  if(keyboard.NumpadSubtract) {
    state.gridSize--;
  }

  ctx.save();
  
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
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';

        ctx.fillRect(
          j * state.gridSize,
          i * state.gridSize,
          state.gridSize,
          state.gridSize
        );
      }
    }
  }

  // TODO: Remove this.
  if(mouse.leftPressed) {
    state.objects.push(new SwitchMoudle(1, 1));
  }

  // Render all the objects.
  state.objects.forEach((object) => {
    return object.render();
  });

  ctx.restore();

  // Update input.
  updateInputManager();

  // Take it back now y'all.
  window.requestAnimationFrame(gameLoop);
}

/** Setups the canvas render cycle. */
export function setupCanvas() {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if(!canvas) {
    throw new Error('No canvas.');
  }
  ctx = canvas.getContext('2d') as any;
  if(!ctx) {
    throw new Error('No context.');
  }
  
  // Set the canvas to the whole screen.
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  // Start the game loop.
  window.requestAnimationFrame(gameLoop);
}
