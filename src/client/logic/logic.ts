import { updateInputManager } from 'easy-web-input';

import { GameState } from '../types/types';

import doInput from './input';
import { cleanCanvas, renderCursor, renderGrid, renderObjects } from './render';
import { checkWiring, renderWiring } from './wiring';

import { ctx, canvas } from './canvas';

export const state: GameState = {
  camera: {
    x: 0,
    y: 0,
    scale: 1
  },
  modules: [],
  gridSize: 64,
  moduleInHand: null
}

/** The game loop. */
export function gameLoop() {
  cleanCanvas();

  doInput();
  
  renderGrid();
  
  ctx.save();
  
  let cx = state.camera.x * -state.gridSize * state.camera.scale + (canvas.width / 2);
  let cy = state.camera.y * -state.gridSize * state.camera.scale + (canvas.height / 2);
  
  ctx.translate(cx, cy);
  ctx.scale(state.camera.scale, state.camera.scale);
  
  renderObjects();
  
  renderCursor();

  ctx.restore();

  checkWiring();
  renderWiring();

  // Update input.
  updateInputManager();

  // Take it back now y'all.
  window.requestAnimationFrame(gameLoop);
}
