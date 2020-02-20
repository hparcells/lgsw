import { setState } from './logic';
import getModuleFromString from '../utils/get-module';

import { SaveFormat, GameState } from '../types/types';

import { state } from './logic';

function isSaveFormat(save: any) {
  return 'version' in save
  && 'camera' in save
  && 'modules' in save
  && 'gridSize' in save
  && 'moduleInHand' in save;
}

export function toSaveFormat() {
  const save: SaveFormat = {
    version: 1,
    camera: state.camera,
    modules: [],
    gridSize: state.gridSize,
    inHand: state.inHand,
    mode: state.mode
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
  if(!isSaveFormat(loadedSave)) {
    window.alert('Inputted save is not parsable. If you feel this is wrong open an issue at https://github.com/hparcells/lgsw/issues/.\n\nError Code: 2.');
    return;
  }

  const save: GameState = {
    camera: loadedSave.camera,
    modules: [],
    gridSize: loadedSave.gridSize,
    inHand: loadedSave.inHand,
    mode: loadedSave.mode
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
