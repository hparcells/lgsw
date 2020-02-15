import { inputManagerEndFrame } from 'easy-web-input';

import { GameState } from '../types/types';

import doInput from './input';
import { cleanCanvas, renderCursor, renderGrid, renderObjects } from './render';
import { checkWiring, renderWiring, renderWireAction } from './wiring';
import { renderDebugOverlay, setRStart } from './debug';

import { ctx, canvas } from './canvas';

export let state: GameState = {
  camera: {
    x: 0,
    y: 0,
    scale: 1,
    wireOpacity: 1
  },
  modules: [],
  gridSize: 64,
  moduleInHand: null
}

export function setState(newState: GameState) {
  state = newState;
}

/** The game loop. */
export function gameLoop() {
  setRStart(performance.now());

  cleanCanvas();
  
  doInput();
  
  renderGrid();
  
  checkWiring();

  ctx.save();
  
  let cx = state.camera.x * -state.gridSize * state.camera.scale + (canvas.width / 2);
  let cy = state.camera.y * -state.gridSize * state.camera.scale + (canvas.height / 2);
  
  ctx.translate(cx, cy);
  ctx.scale(state.camera.scale, state.camera.scale);
  
  renderObjects();
  
  renderCursor();
  
  renderWiring();
  
  ctx.restore();

  renderWireAction();
  
  // Debug
  renderDebugOverlay();

  // Update input.
  inputManagerEndFrame();  
  
  // Take it back now y'all.
  window.requestAnimationFrame(gameLoop);
}