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
        startingModule.outputs.length + 1 < startingModule.accepts.output.count
        && endingModule.inputs.length + 1 < endingModule.accepts.input.count
      ) {
        startingModule.outputs.push(endingModule.id);
        endingModule.inputs.push(startingModule.id);

      }

      endingModule.doLogic();
    }
  }
}
export function renderWiring() {
  if(mouse.left) {
    if(isWiring) {
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.moveTo(startClick.x, startClick.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.lineWidth = 3 * (state.gridSize / 64);
      ctx.stroke();
    }
  }
}
