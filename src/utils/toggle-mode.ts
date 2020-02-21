import { ModeOption } from '../types/types';

import { state } from '../logic/logic';
import { canvas } from '../logic/canvas';

export function toggleMode(mode: ModeOption) {
  state.inHand = [];

  if(state.mode === mode) {
    state.mode = 'normal';
  }else {
    state.mode = mode;
  }

  canvas.style.cursor = 'default';
}
