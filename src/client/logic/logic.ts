import { updateInputManager, mouse, keyboard } from 'easy-web-input';

import { GameState } from '../types';

export const GRID_SIZE = 64;

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

let state: GameState = {
  objects: []
}

let lastClick = { x: 0, y: 0 };
let previousCameraPosition = { x: 0, y: 0 };

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

  // Draw the grid.
  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / GRID_SIZE); i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / GRID_SIZE); j++) {
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
        j * GRID_SIZE,
        i * GRID_SIZE,
        GRID_SIZE,
        GRID_SIZE
      );
    }
  }
  
  // Draw the hovered tile.
  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / GRID_SIZE * 1.5); i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / GRID_SIZE) * 1.5; j++) {
      if(
        mouse.x >= j * GRID_SIZE
        && mouse.x <= j * GRID_SIZE + GRID_SIZE
        && mouse.y >= i * GRID_SIZE
        && mouse.y <= i * GRID_SIZE + GRID_SIZE
      ) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';

        ctx.fillRect(
          j * GRID_SIZE,
          i * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE
        );
      }
    }
  }

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
