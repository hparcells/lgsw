import Module from '../../../types/Module';
import { ModuleAcceptance } from '../../../types/types';

import { state } from '../../logic';
import { ctx } from '../../canvas';

class AndModule extends Module {
  accepts: ModuleAcceptance = {
    input: {
      accept: true,
      count: Infinity
    },
    output: {
      accept: true,
      count: Infinity
    }
  }

  constructor(x: number, y: number) {
    super('and');

    this.x = x;
    this.y = y;
  }

  render() {
    ctx.save();
    ctx.translate(this.x * state.gridSize, this.y * state.gridSize);

    // THe background.
    ctx.fillStyle = '#636363';
    ctx.fillRect(0, 0, state.gridSize, state.gridSize);

    // The word.
    ctx.save();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(state.gridSize / 2, state.gridSize / 2);
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('AND', 0, 0);

    ctx.restore();

    ctx.restore();
  }

  onClick() {}

  doLogic(originId?: string) {
    // Update this state.
    this.on = this.inputs.map((id) => {
      return state.modules.find((module) => {
        return module.id === id;
      })?.on;
    }).every((input) => {
      return input === true;
    });
    
    // Update all connected modules.
    this.outputs.map((outputId) => {
      return state.modules.find((moudle) => {
        return moudle.id === outputId;
      });
    }).forEach((module) => {
      if(module?.id !== originId) {
        module?.doLogic(this.id);
      } 
    });
  }
}

export default AndModule;