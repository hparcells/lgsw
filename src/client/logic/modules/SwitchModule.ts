import Module from '../../types/Moudle';

import { ctx, state } from '../logic';

class SwitchModule extends Module {
  // Internal state.
  on: boolean = false;

  constructor(x: number, y: number) {
    super('switch');

    this.x = x;
    this.y = y;
  }

  onClick() {
    this.on = !this.on;
  }

  render() {
    // The background.
    ctx.fillStyle = '#B4B8B8';
    ctx.fillRect(this.x * state.gridSize, this.y * state.gridSize, state.gridSize, state.gridSize);
    
    // Switch background.
    ctx.fillStyle = '#6B6B6B';
    ctx.translate(
      (this.x * state.gridSize),
      (this.y * state.gridSize)
    );
    ctx.fillRect(
      (state.gridSize / 2) - ((state.gridSize / 3) / 2),
      (state.gridSize / 2) - ((state.gridSize / 1.25) / 2),
      state.gridSize / 3,
      state.gridSize / 1.25
    );
    
    // The actual switch.
    if(this.on) {
      ctx.fillStyle = '#00FF00';
    }else {
      ctx.fillStyle = '#FF0000';
    }
    ctx.fillRect(
      (state.gridSize / 2) - ((state.gridSize / 3) / 2),
      this.on
        ? (state.gridSize / 2) - ((state.gridSize / 1.25) / 2)
        : ((state.gridSize / 2) - ((state.gridSize / 1.25) / 2)) + state.gridSize / 2,
      state.gridSize / 3,
      state.gridSize / 3
    );
    ctx.translate(
      -(this.x * state.gridSize),
      -(this.y * state.gridSize)
    );
  }
}

export default SwitchModule;
