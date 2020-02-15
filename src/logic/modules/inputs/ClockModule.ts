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

  lastAlternation = 0;

  constructor(x: number, y: number) {
    super('clock');

    this.x = x;
    this.y = y;
  }

  render() {
    if(Date.now() >= this.lastAlternation + 100) {
      this.lastAlternation = Date.now();
      this.doLogic();
    }

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
  }

  onClick() {}
  doLogic() {
    this.on = !this.on;

    this.outputs.forEach((output) => {
      return state.modules.find((module) => {
        return module.id === output;
      })?.doLogic();
    });
  }
}

export default ClockModule;
