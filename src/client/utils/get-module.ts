import { ModuleString } from '../types/types';

import SwitchModule from '../logic/modules/inputs/SwitchModule';
import LampModule from '../logic/modules/outputs/LampModule';
import AndModule from '../logic/modules/gates/AndModule';
import NandModule from '../logic/modules/gates/NandModule';
import OrModule from '../logic/modules/gates/OrModule';
import NorModule from '../logic/modules/gates/NorModule';

const MODULE_MAP = {
  switch: SwitchModule,
  lamp: LampModule,
  and: AndModule,
  nand: NandModule,
  or: OrModule,
  nor: NorModule
}

export default function getModuleFromString(module: ModuleString) {
  return MODULE_MAP[module];
}
