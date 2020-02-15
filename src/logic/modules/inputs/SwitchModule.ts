import Module from '../../../types/Module';

import { ModuleAcceptance } from '../../../types/types';

import { ctx } from '../../canvas';
import { state } from '../../logic';

class SwitchModule extends Module {
  accepts: ModuleAcceptance = {
    input: {
      accept: false,
      count: 0
    },
    output: {
      accept: true,
      count: Infinity
    }
  }

  constructor(x: number, y: number) {
    super('switch');

    this.x = x;
    this.y = y;
  }

  render() {
    // The background.
    ctx.fillStyle = '#B4B8B8';
    ctx.fillRect(this.x * state.gridSize, this.y * state.gridSize, state.gridSize, state.gridSize);
    
    // Switch background.
    ctx.fillStyle = '#6B6B6B';
    ctx.fillRect(
      this.x * state.gridSize + (state.gridSize / 2) - ((state.gridSize / 3) / 2),
      this.y * state.gridSize + (state.gridSize / 2) - ((state.gridSize / 1.25) / 2),
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
      this.x * state.gridSize + (state.gridSize / 2) - ((state.gridSize / 3) / 2),
      this.y * state.gridSize + (this.on
        ? (state.gridSize / 2) - ((state.gridSize / 1.25) / 2)
        : ((state.gridSize / 2) - ((state.gridSize / 1.25) / 2)) + state.gridSize / 2),
      state.gridSize / 3,
      state.gridSize / 3
    );
  }

  getExpectedState() {}

  onClick() {
    this.on = !this.on;

    this.doLogic();
  }
  doLogic() {
    this.outputs.forEach((output) => {
      return state.modules.find((module) => {
        return module.id === output;
      })?.doLogic();
    });
  }
}

export default SwitchModule;
