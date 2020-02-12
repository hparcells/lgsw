import Module from '../../types/Module';

import { ctx } from '../canvas';
import { state } from '../logic';
import { ModuleAcceptance } from '../../types/types';

class LightModule extends Module {
  accepts: ModuleAcceptance = {
    input: {
      accept: true,
      count: Infinity
    },
    output: {
      accept: false,
      count: 0
    }
  }

  constructor(x: number, y: number) {
    super('light');

    this.x = x;
    this.y = y;
  }

  render() {
    ctx.save();
    ctx.translate(this.x * state.gridSize, this.y * state.gridSize);
    
    ctx.fillStyle = '#969696'
    ctx.fillRect(0, 0, state.gridSize, state.gridSize);
    
    if(this.on) {
      ctx.fillStyle = '#D7E37F';
    }else {
      ctx.fillStyle = '#636363';
    }

    ctx.fillRect(
      state.gridSize / 10,
      state.gridSize / 10,
      state.gridSize - ((state.gridSize / 10) * 2),
      state.gridSize - ((state.gridSize / 10) * 2)
    );
      
    ctx.restore();
  }
  
  onClick() {}
  doLogic() {
    this.on = this.inputs.map((id) => {
      return state.modules.find((module) => {
        return module.id === id;
      })?.on;
    }).includes(true);
  }
}

export default LightModule;
