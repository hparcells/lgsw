import { shouldDrawHoveredTile } from './wiring';
import { state } from './logic';
import { ctx, canvas } from './canvas';
import { mousePos } from './input';
import { GRID_COLOR_1, GRID_COLOR_2 } from './constants';

export function cleanCanvas() {
  // Clean the entire canvas.
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function renderGrid() {
  const lineSize = state.gridSize * state.camera.scale;
  const lineSize2 = 2 * lineSize;

  // background
  ctx.fillStyle = GRID_COLOR_1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //  checkerboard
  ctx.fillStyle = GRID_COLOR_2;

  const startX = (
    ((state.camera.x / 2) * -lineSize2) % lineSize2)
    - lineSize2 * 2
    - ((canvas.width / -2) % lineSize2
  );
  const startY = (
    ((state.camera.y / 2) * -lineSize2) % lineSize2)
    - lineSize2 * 2
    - ((canvas.height / -2) % lineSize2
  );

  for(let xx = startX; xx < canvas.width; xx += lineSize2) {
    for(let yy = startY; yy < canvas.height; yy += lineSize2) {
      ctx.fillRect(xx - 1, yy - 1, lineSize, lineSize);
      ctx.fillRect(xx - 1 + lineSize, yy - 1 + lineSize, lineSize, lineSize);
    }
  }
}

export function renderCursor() {
  if(state.moduleInHand) {
    ctx.globalAlpha = 0.5;
    
    // Render the moudle in hand.
    new state.moduleInHand(mousePos.x, mousePos.y).render();
    
    ctx.globalAlpha = 1;
  }else if(shouldDrawHoveredTile) {
    ctx.fillStyle = 'rgba(0, 255, 0, 0.25)';

    ctx.fillRect(
      mousePos.x * state.gridSize,
      mousePos.y * state.gridSize,
      state.gridSize,
      state.gridSize
    );
  }
}

export function renderObjects() {
  // Render all the objects.-
  state.modules.forEach((object) => {
    return object.render();
  });
}
