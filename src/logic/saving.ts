import { setState } from './logic';
import getModuleFromString from '../utils/get-module';
import { loadSchematic } from './schematic';

import { SaveFormat, GameState, SaveModule, Schematic } from '../types/types';
import Module from '../types/Module';

import { state } from './logic';

export function isSaveFormat(save: any) {
  return 'version' in save
    && 'camera' in save
    && 'modules' in save
    && 'gridSize' in save
    && 'inHand' in save
    && 'mode' in save
    && 'clipboard' in save;
}
export function isSchematic(save: any) {
  return 'author' in save
    && 'modules' in save;
}

export function toSaveModule(module: Module): SaveModule {
  return {
    type: module.type,
    id: module.id,
    x: module.x,
    y: module.y,
    on: module.on,
    inputs: module.inputs,
    outputs: module.outputs
  };
}

export function getSaveFormat(): SaveFormat {
  const save: SaveFormat = {
    version: 1,
    camera: state.camera,
    modules: [],
    gridSize: state.gridSize,
    inHand: state.inHand,
    mode: state.mode,
    clipboard: state.clipboard
  };

  // Modules
  state.modules.forEach((module) => {
    save.modules.push(toSaveModule(module));
  });

  return save;
}
export function loadSave(loadedSave: SaveFormat | Schematic) {
  if(!isSaveFormat(loadedSave) && !isSchematic(loadedSave)) {
    window.alert('Inputted save is not parsable. If you feel this is wrong open an issue at https://github.com/hparcells/lgsw/issues/.\n\nError Code: 2.');
    
    return;
  }

  if(isSaveFormat(loadedSave)) {
    loadedSave = loadedSave as SaveFormat;

    const save: GameState = {
      camera: loadedSave.camera,
      modules: [],
      gridSize: loadedSave.gridSize,
      inHand: loadedSave.inHand,
      mode: loadedSave.mode,
      clipboard: loadedSave.clipboard
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
  }else if(isSchematic(loadedSave)) {
    loadedSave = loadedSave as Schematic;

    loadSchematic(loadedSave);
  }
}
