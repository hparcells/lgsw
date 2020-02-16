import { setState } from './logic';
import getModuleFromString from '../utils/get-module';

import { SaveFormat, GameState } from '../types/types';

import { state } from './logic';

export function toSaveFormat() {
  const save: SaveFormat = {
    version: 1,
    camera: state.camera,
    modules: [],
    gridSize: state.gridSize,
    moduleInHand: state.moduleInHand
  };

  // Modules
  state.modules.forEach((module) => {
    save.modules.push({
      type: module.type,
      id: module.id,
      x: module.x,
      y: module.y,
      on: module.on,
      inputs: module.inputs,
      outputs: module.outputs
    });
  });

  return save;
}
export function loadSave(loadedSave: SaveFormat) {
  const save: GameState = {
    camera: loadedSave.camera,
    modules: [],
    gridSize: loadedSave.gridSize,
    moduleInHand: loadedSave.moduleInHand
  }

  // Modules
  loadedSave.modules.forEach((module) => {
    const moduleClass = getModuleFromString(module.type);
    const newModule = new moduleClass(module.x, module.y);

    newModule.id = module.id;
    newModule.on = module.on;
    newModule.inputs = module.inputs;
    newModule.outputs = module.outputs;

    save.modules.push(newModule);
  });

  setState(save);
}
