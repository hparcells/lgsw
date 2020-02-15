import { remove } from '@reverse/array';
import { mouse } from 'easy-web-input';

import { getMouseGridPos } from '../utils/mouse';

import { state } from './logic';
import { mousePos } from './input';
import { ctx } from './canvas';

export let shouldDrawHoveredTile = true;
export let isWiring = false;

let startClick = { x: 0, y: 0 };

export function disableWiring() {
  isWiring = false;
  shouldDrawHoveredTile = true;
}
export function toggleWiring() {
  isWiring = !isWiring;
  shouldDrawHoveredTile = !shouldDrawHoveredTile;
}
export function checkWiring() {
  if(mouse.leftPressed) {
    startClick.x = mouse.x;
    startClick.y = mouse.y;
  }
  if(mouse.leftReleased && isWiring) {
    const startingMousePos = getMouseGridPos(startClick.x, startClick.y);

    const startingModule = state.modules.find((moudle) => {
      return moudle.x === startingMousePos.x && moudle.y === startingMousePos.y;
    });
    const endingModule = state.modules.find((moudle) => {
      return moudle.x === mousePos.x && moudle.y === mousePos.y;
    });

    // If the IO is right.
    if(
      (startingModule && endingModule)
      && (startingModule.accepts.output.accept && endingModule.accepts.input.accept)
    ) {
      // If they are already connected.
      if(startingModule.outputs.includes(endingModule.id) && endingModule.inputs.includes(startingModule.id)) {
        startingModule.outputs = remove(startingModule.outputs, endingModule.id);
        endingModule.inputs = remove(endingModule.inputs, startingModule.id);
      }else if(
        // If there is room for another conenction.
        startingModule.outputs.length + 1 <= startingModule.accepts.output.count
        && endingModule.inputs.length + 1 <= endingModule.accepts.input.count
        ) {
          startingModule.outputs.push(endingModule.id);
          endingModule.inputs.push(startingModule.id);
        }

        startingModule.doLogic();
        endingModule.doLogic();
      }
    }
}
export function renderWireAction() {
  ctx.save();
  ctx.globalAlpha = state.camera.wireOpacity;

  if(mouse.left) {
    if(isWiring) {
      ctx.save();
  
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.moveTo(startClick.x, startClick.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.lineWidth = 3 * state.camera.scale;
      ctx.lineCap = 'round';
      ctx.stroke();
  
      ctx.restore();
    }
  }

  ctx.restore();
}
export function renderWiring() {
  ctx.save();
  ctx.globalAlpha = state.camera.wireOpacity;

  state.modules.forEach((module) => {
    return module.outputs.forEach((outputId) => {
      if(module.on) {
        ctx.strokeStyle = '#00FF00';
      }else {
        ctx.strokeStyle = '#FF0000';
      }

      const connectedMoudle = state.modules.find((module) => {
        return module.id === outputId;
      });

      if(connectedMoudle) {
        ctx.beginPath();
        ctx.moveTo(
          (module.x * state.gridSize) + (state.gridSize * 0.9),
          (module.y * state.gridSize) + (state.gridSize * 0.1)
        );
        ctx.lineTo(
          (connectedMoudle.x * state.gridSize) + (state.gridSize * 0.1),
          (connectedMoudle.y * state.gridSize) + (state.gridSize * 0.9)
        );
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    });
  });

  ctx.restore();
}
