import Module from '../../../types/Module';
import { ModuleAcceptance } from '../../../types/types';

import { updateModules } from '../../update';

import { state } from '../../logic';
import { ctx } from '../../canvas';

class NotModule extends Module {
  accepts: ModuleAcceptance = {
    input: {
      accept: true,
      count: 1
    },
    output: {
      accept: true,
      count: 1
    }
  }

  constructor(x: number, y: number) {
    super('not');

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
    ctx.fillStyle = '#27CF46';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('NOT', 0, 0);

    ctx.restore();

    ctx.restore();
  }

  onClick() {}

  doLogic(originId?: string) {
    this.on = !this.inputs.map((id) => {
      return state.modules.find((module) => {
        return module.id === id;
      });
    })[0]?.on;

    // Update all connected modules.
    updateModules(this.id, this.outputs, originId);
  }
}

export default NotModule;
