import { updateInputManager, mouse, keyboard } from 'easy-web-input';

import { GameState } from '../types';

export const GRID_SIZE = 64;

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

let state: GameState = {
  objects: [],
  camera: {
    x: 0,
    y: 0,
    scale: 1
  }
}

/** The game loop. */
function gameLoop() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Handle zooming.
  if(mouse.scrollY) {
    // TODO: Make this better/less sensitive.
    state.camera.scale = Math.min(Math.max(state.camera.scale - mouse.scrollY, 0.5), 2);
  }

  // Save camera settings.
  ctx.save();

  // Move the camera.
  ctx.translate(state.camera.x, state.camera.y);
  ctx.scale(state.camera.scale, state.camera.scale);

  // Resize the canvas when we resize the canvas.
  window.addEventListener('resize', () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });

  // Draw the grid.
  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / (GRID_SIZE * state.camera.scale) / state.camera.scale); i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / (GRID_SIZE * state.camera.scale) / state.camera.scale); j++) {
      if(i % 2 === 0 && j % 2 === 0) {
        ctx.fillStyle = '#000000';
      }else if(i % 2 === 0) {
        ctx.fillStyle = '#FFFFFF';
      }else if(j % 2 === 0) {
        ctx.fillStyle = '#FFFFFF';
      }else {
        ctx.fillStyle = '#000000';
      }

      ctx.fillRect(j * (GRID_SIZE * state.camera.scale), i * (GRID_SIZE * state.camera.scale), GRID_SIZE * state.camera.scale, GRID_SIZE * state.camera.scale);
    }
  }


  // Restore camera settings..
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
