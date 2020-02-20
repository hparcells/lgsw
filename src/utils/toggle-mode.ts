import { ModeOption } from '../types/types';

import { state } from '../logic/logic';

export function toggleMode(mode: ModeOption) {
  state.inHand = [];

  if(state.mode === mode) {
    state.mode = 'normal';
  }else {
    state.mode = mode;
  }
}