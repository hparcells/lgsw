import { Schematic } from '../types/types';

import { state } from './logic';

export function loadSchematic(schematic: Schematic) {
  let reduceAmount = { x: 0, y: 0 };

  state.inHand = [];

  schematic.modules.sort((a, b) => {
    return a.x - b.x || a.y - b.y;
  }).forEach((module, index) => {
    if(index === 0) {
      reduceAmount.x = module.x;
      reduceAmount.y = module.y;
    }

    module.x -= reduceAmount.x;
    module.y -= reduceAmount.y;

    state.inHand.push(module);
  });
}
