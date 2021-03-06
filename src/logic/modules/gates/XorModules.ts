import Module from '../../../types/Module';
import { ModuleAcceptance } from '../../../types/types';

import { state } from '../../logic';
import { ctx } from '../../canvas';

class XorModule extends Module {
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
    super('xor');

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
    ctx.fillStyle = '#d20ced';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('XOR', 0, 0);

    ctx.restore();

    ctx.restore();
  }

  onClick() {}

  getExpectedState() {
    return !!(this.inputs.map((id) => {
      return state.modules.find((module) => {
        return module.id === id;
      })?.on;
    }).filter((module) => {
      return module === true;
    }).length % 2);
  }

  doLogic(originId: string) {
    // Update this state.
    this.on = this.getExpectedState();
  }
}

export default XorModule;
