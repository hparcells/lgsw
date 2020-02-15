import { ModuleString } from '../types/types';

import SwitchModule from '../logic/modules/inputs/SwitchModule';
import LampModule from '../logic/modules/outputs/LampModule';
import AndModule from '../logic/modules/gates/AndModule';
import NandModule from '../logic/modules/gates/NandModule';
import OrModule from '../logic/modules/gates/OrModule';
import NorModule from '../logic/modules/gates/NorModule';
import NotModule from '../logic/modules/gates/NotModule';
import XorModule from '../logic/modules/gates/XorModules';
import XnorModule from '../logic/modules/gates/XnorModule';
import ClockModule from '../logic/modules/inputs/ClockModule';

const MODULE_MAP = {
  switch: SwitchModule,
  clock: ClockModule,

  lamp: LampModule,

  and: AndModule,
  nand: NandModule,
  or: OrModule,
  nor: NorModule,
  not: NotModule,
  xor: XorModule,
  xnor: XnorModule
}

export default function getModuleFromString(module: ModuleString) {
  return MODULE_MAP[module];
}
