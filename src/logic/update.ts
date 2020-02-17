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
    // If we haven't updated this module yet.
    if(!updatedModules.includes(module.id)) {
      // If the state differs.
      if(module.getExpectedState() !== module.on) {
        // Update it.
        nextModuleUpdateQueue = nextModuleUpdateQueue.concat(module.outputs);
        updatedModules.push(module.id);
        
        return module.doLogic();
      }
    }else {
      // If we have updated this module this frame.

      // If the state will be different next frame.
      if(module.getExpectedState() !== module.on) {
        // If updated this module last time.
        if(lastModuleUpdateQueue.includes(module.id)) {
          pendingFrameUpdateQueue.push(module.id);
        }
      }
    }
  });

  lastModuleUpdateQueue = moduleUpdateQueue;
  moduleUpdateQueue = unique(nextModuleUpdateQueue);
  nextModuleUpdateQueue = [];
  
  if(moduleUpdateQueue.length > 0) {
    pendingFrameUpdateQueue = unique(pendingFrameUpdateQueue);
    updateModuleQueue();
  }else {
    lastModuleUpdateQueue = [];
    moduleUpdateQueue = [];
    nextModuleUpdateQueue = [];
    updatedModules = [];
  }
}

export function updatePendingModules() {
  moduleUpdateQueue = moduleUpdateQueue.concat(pendingFrameUpdateQueue);

  updateModuleQueue();

  pendingFrameUpdateQueue = [];
}
export function updateModule(module: string) {
  moduleUpdateQueue.push(module);

  updateModuleQueue();
}
