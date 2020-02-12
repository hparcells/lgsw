import { mouse } from 'easy-web-input';

import { canvas } from '../logic/canvas';
import { state } from '../logic/logic';

export function getMouseGridPos(x: number = mouse.x, y: number = mouse.y) {
  const mousePos = { x: 0, y: 0 };

  let cx = state.camera.x * -state.gridSize * state.camera.scale + (canvas.width / 2);
  let cy = state.camera.y * -state.gridSize * state.camera.scale + (canvas.height / 2);

  // Find X and Y.
  mousePos.x = (
    Math.floor((x - cx) / (state.gridSize * state.camera.scale)) * (state.gridSize * state.camera.scale)
  ) / state.camera.scale;
  mousePos.y = (
    Math.floor((y - cy) / (state.gridSize * state.camera.scale)) * (state.gridSize * state.camera.scale)
  ) / state.camera.scale;

  // Convert to tiles.
  mousePos.x = mousePos.x / state.gridSize;
  mousePos.y = mousePos.y / state.gridSize;

  return mousePos;
}
