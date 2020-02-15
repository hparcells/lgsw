import { gameLoop } from './logic';

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

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
  
  // Resize the canvas when we resize the canvas.
  window.addEventListener('resize', () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });
  
  document.body.onmousedown = (ev) => {
    if(ev.button === 1) {
      return false;
    }
  };

  // Start the game loop.
  window.requestAnimationFrame(gameLoop);
}
