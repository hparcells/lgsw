import Module from '../../types/Moudle';

import { ctx, state } from '../logic';

class SwitchMoudle extends Module {
  // Internal state.
  isOn: boolean = false;

  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
  }

  render() {
    if(this.isOn) {
      ctx.fillStyle = '#00FF00';
    }else {
      ctx.fillStyle = '#FF0000';
    }

    ctx.fillRect(this.x * state.gridSize, this.y * state.gridSize, state.gridSize, state.gridSize);
  }
}

export default SwitchMoudle;
