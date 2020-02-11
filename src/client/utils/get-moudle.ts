import SwitchModule from '../logic/modules/SwitchModule';
import { ModuleString } from '../types/types';

const MODULE_MAP = {
  switch: SwitchModule
}

export default function getModuleFromString(module: ModuleString) {
  return MODULE_MAP[module];
}
