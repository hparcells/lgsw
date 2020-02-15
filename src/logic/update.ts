import { unique } from '@reverse/array';

import { state } from './logic';

let lastModuleUpdateQueue: string[] = [];
let moduleUpdateQueue: string[] = [];
let nextModuleUpdateQueue: string[] = [];
let pendingFrameUpdateQueue: string[] = [];

let updatedModules: string[] = [];

function updateModuleQueue() {
  moduleUpdateQueue.map((moduleId) => {
    return state.modules.find((module) => {
      return module.id === moduleId;
    });
  }).forEach((module) => {
    if(!module) {
      return;
    }

    if(!updatedModules.includes(module.id)) {
      nextModuleUpdateQueue = nextModuleUpdateQueue.concat(module.outputs);
      updatedModules.push(module.id);
      
      return module.doLogic();
    }else {
      if(lastModuleUpdateQueue.includes(module.id)) {
        if(module.getExpectedState() !== module.on) {
          if(!pendingFrameUpdateQueue.includes(module.id)) {
            pendingFrameUpdateQueue.push(module.id);
          }
        }
      }
    }
  });

  lastModuleUpdateQueue = moduleUpdateQueue;
  moduleUpdateQueue = unique(nextModuleUpdateQueue);
  nextModuleUpdateQueue = [];

  if(moduleUpdateQueue.length > 0) {
    updateModuleQueue();
  }else {
    lastModuleUpdateQueue = [];
    moduleUpdateQueue = [];
    nextModuleUpdateQueue = [];
    updatedModules = [];
  }
}

export function updatePendingModules() {
  pendingFrameUpdateQueue.map((moduleId) => {
    return state.modules.find((module) => {
      return module.id === moduleId;
    });
  }).forEach((module) => {
    if(module) {
      module.doLogic();
      updateModule(module.id);
    }
  });

  pendingFrameUpdateQueue = [];
}
export function updateModule(module: string) {
  moduleUpdateQueue.push(module);

  updateModuleQueue();
}
