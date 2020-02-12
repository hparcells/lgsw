import SwitchModule from '../logic/modules/SwitchModule';
import { ModuleString } from '../types/types';
import LightModule from '../logic/modules/LightModule';

const MODULE_MAP = {
  switch: SwitchModule,
  light: LightModule
}

export default function getModuleFromString(module: ModuleString) {
  return MODULE_MAP[module];
}
