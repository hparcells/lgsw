import { updateInputManager, mouse, keyboard } from 'easy-web-input';

import { GameState } from '../types';

export const GRID_SIZE = 128;

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

let state: GameState = {
  objects: [],
  camera: {
    x: 0,
    y: 0,
    scale: 0.5
  }
}

/** The game loop. */
function gameLoop() {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Handle arrow keys.
  if(keyboard.ArrowLeft) {
    state.camera.x -= 5;
  }
  // Handle arrow keys.
  if(keyboard.ArrowRight) {
    state.camera.x += 5;
  }
  if(keyboard.ArrowUp) {
    state.camera.y -= 5;
  }
  if(keyboard.ArrowDown) {
    state.camera.y += 5;
  }

  // Mouse movement.
  if(mouse.right) {
    // TODO:
  }

  // Resize the canvas when we resize the canvas.
  window.addEventListener('resize', () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });

  ctx.save();

  ctx.translate(-(state.camera.x % GRID_SIZE) - GRID_SIZE * 2, -(state.camera.y % GRID_SIZE) - GRID_SIZE);

  // Draw the grid.
  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / (GRID_SIZE * state.camera.scale)) * 1.5; i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / (GRID_SIZE * state.camera.scale)) * 1.5; j++) {
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
        (j * (GRID_SIZE * state.camera.scale)),
        (i * (GRID_SIZE * state.camera.scale)),
        GRID_SIZE * state.camera.scale,
        GRID_SIZE * state.camera.scale
      );
    }
  }

  ctx.restore();

  // Save camera settings.
  ctx.save();

  ctx.translate(-state.camera.x, -state.camera.y);

  ctx.fillStyle = '#FF0000';
  ctx.fillRect(-GRID_SIZE, -GRID_SIZE, GRID_SIZE * state.camera.scale, GRID_SIZE * state.camera.scale);
  ctx.fillRect(-GRID_SIZE, -GRID_SIZE * 2, GRID_SIZE * state.camera.scale, GRID_SIZE * state.camera.scale);

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
