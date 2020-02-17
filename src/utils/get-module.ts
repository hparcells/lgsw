import { ModuleType } from '../types/types';

import SwitchModule from '../logic/modules/inputs/SwitchModule';
import ButtonModule from '../logic/modules/inputs/ButtonModule';
import ClockModule from '../logic/modules/inputs/ClockModule';

import LampModule from '../logic/modules/outputs/LampModule';

import AndModule from '../logic/modules/gates/AndModule';
import NandModule from '../logic/modules/gates/NandModule';
import OrModule from '../logic/modules/gates/OrModule';
import NorModule from '../logic/modules/gates/NorModule';
import NotModule from '../logic/modules/gates/NotModule';
import XorModule from '../logic/modules/gates/XorModules';
import XnorModule from '../logic/modules/gates/XnorModule';

const MODULE_MAP = {
  switch: SwitchModule,
  button: ButtonModule,
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

export default function getModuleFromString(module: ModuleType) {
  return MODULE_MAP[module];
}
