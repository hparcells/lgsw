import Module from '../../../types/Module';

import { ModuleAcceptance } from '../../../types/types';

import { ctx } from '../../canvas';
import { state } from '../../logic';

class ButtonModule extends Module {
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

  onTime: number = 0;

  constructor(x: number, y: number) {
    super('button');

    this.x = x;
    this.y = y;
  }

  render() {
    if(Date.now() > this.onTime + 25 && this.on) {
      this.on = false;
      this.doLogic();
    }
    ctx.save();
    ctx.translate(this.x * state.gridSize, this.y * state.gridSize);
    
    ctx.fillStyle = '#969696'
    ctx.fillRect(0, 0, state.gridSize, state.gridSize);
    
    if(this.on) {
      ctx.fillStyle = '#00FF00';
    }else {
      ctx.fillStyle = '#FF0000';
    }

    ctx.fillRect(
      state.gridSize / 10,
      state.gridSize / 10,
      state.gridSize - ((state.gridSize / 10) * 2),
      state.gridSize - ((state.gridSize / 10) * 2)
    );
      
    ctx.restore();
  }

  getExpectedState() {}

  onClick() {
    this.onTime = Date.now();

    this.on = true;
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

export default ButtonModule;
