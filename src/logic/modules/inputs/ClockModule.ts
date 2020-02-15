import Module from '../../../types/Module';

import { ModuleAcceptance } from '../../../types/types';

import { ctx } from '../../canvas';
import { state } from '../../logic';

class ClockModule extends Module {
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
    super('clock');

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
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('CLOCK', 0, 0);

    ctx.restore();

    ctx.restore();

    this.doLogic();
  }

  onClick() {}
  doLogic() {
    this.on = !!(Math.floor((Date.now() / 1000)) % 2);

    this.outputs.forEach((output) => {
      return state.modules.find((module) => {
        return module.id === output;
      })?.doLogic();
    });
  }
}

export default ClockModule;
