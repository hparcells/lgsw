import { updateInputManager, mouse, keyboard } from 'easy-web-input';

import { GameState } from '../types/types';

import { getMouseGridPos } from '../utils/mouse';

import SwitchModule from './modules/SwitchModule';
import getModuleFromString from '../utils/get-moudle';

export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D;

export const state: GameState = {
  modules: [],
  gridSize: 64,
  moudleInHand: null
}

let shouldDrawHoveredTile = true;

/** The game loop. */
function gameLoop() {
  const mousePos = getMouseGridPos();

  // Clean the entire canvas.
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Resize the canvas when we resize the canvas.
  window.addEventListener('resize', () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  });

  // Check for zoom input.
  if(keyboard.NumpadAdd) {
    state.gridSize++;
  }
  if(keyboard.NumpadSubtract) {
    state.gridSize--;
  }

  // Check for deselect input.
  if(keyboard.qPressed) {
    if(state.moudleInHand) {
      state.moudleInHand = null;
    }else {
      const hoveredMoudle = state.modules.find((module) => {
        return module.x === mousePos.x && module.y === mousePos.y;
      });

      if(hoveredMoudle) {
        state.moudleInHand = getModuleFromString(hoveredMoudle.moduleName);
      }
    }
  }

  // Check for module hotkeys pressed.
  if(keyboard.Digit1Pressed) {
    state.moudleInHand = SwitchModule;
  }

  // Check for left click.
  if(mouse.left) {
  }

  if(mouse.leftPressed) {
    if(state.moudleInHand) {
      if(!state.modules.find((module) => {
        return module.x === mousePos.x && module.y === mousePos.y;
      })) {
        state.modules.push(new state.moudleInHand(mousePos.x, mousePos.y));
      }
    }else {
      state.modules.find((moudle) => {
        return moudle.x === mousePos.x && moudle.y === mousePos.y;
      })?.onClick();
    }
  }

  ctx.save();
  
  // Draw the grid.
  // For each row.
  for(let i = 0; i < Math.ceil(canvas.height / state.gridSize); i++) {
    // For each column.
    for(let j = 0; j < Math.ceil(canvas.width / state.gridSize); j++) {
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
        j * state.gridSize,
        i * state.gridSize,
        state.gridSize,
        state.gridSize
      );
    }
  }

  // Render all the objects.
  state.modules.forEach((object) => {
    return object.render();
  });

  // If we have a moudle in our hand.
  if(state.moudleInHand) {
    ctx.globalAlpha = 0.5;

    // Render the moudle in hand.
    new state.moudleInHand(mousePos.x, mousePos.y).render();

    ctx.globalAlpha = 1;
  }else if(shouldDrawHoveredTile) {
    // Draw the hovered tile.
    // For each row.
    for(let i = 0; i < Math.ceil(canvas.height / state.gridSize * 1.5); i++) {
      // For each column.
      for(let j = 0; j < Math.ceil(canvas.width / state.gridSize) * 1.5; j++) {
        if(
          mouse.x >= j * state.gridSize
          && mouse.x <= j * state.gridSize + state.gridSize
          && mouse.y >= i * state.gridSize
          && mouse.y <= i * state.gridSize + state.gridSize
        ) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.25)';
  
          ctx.fillRect(
            j * state.gridSize,
            i * state.gridSize,
            state.gridSize,
            state.gridSize
          );
        }
      }
    }
  }

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
