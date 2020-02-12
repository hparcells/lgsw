import { updateInputManager } from 'easy-web-input';

import { GameState } from '../types/types';

import doInput from './input';
import { cleanCanvas, renderCursor, renderGrid, renderObjects } from './render';
import { ctx } from './canvas';

export const state: GameState = {
  modules: [],
  gridSize: 64,
  moduleInHand: null
}

/** The game loop. */
export function gameLoop() {
  cleanCanvas();
  
  ctx.save();
  
  renderGrid();
  
  renderObjects();

  doInput();

  renderCursor();

  ctx.restore();

  // Update input.
  updateInputManager();

  // Take it back now y'all.
  window.requestAnimationFrame(gameLoop);
}
