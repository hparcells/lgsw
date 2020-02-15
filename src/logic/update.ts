import { state } from './logic';

export let moduleUpdateQueue: string[] = [];

export function clearUpdateQueue() {
  moduleUpdateQueue = [];
}

export function updateModules(moduleId: string, modules: string[], origin?: string) {
  const updatedModules: string[] = [];

  modules.map((outputId) => {
    return state.modules.find((moudle) => {
      return moudle.id === outputId;
    });
  }).forEach((module) => {
    if(module) {
      // Check if we are trying to update a module that was just updated.
      if(module.id === origin) { 
        // If the module to update will have a different state than it has right now.
        if(module.getExpectedState() !== module.on) {
          if(!moduleUpdateQueue.includes(module.id)) {
            moduleUpdateQueue.push(module.id);
          }
        }
      }else {
        // If we haven't updated this module yet.
        if(!updatedModules.includes(module.id)) {
          module.doLogic(moduleId);
          updatedModules.push(module.id);
        }else {
          console.log('potiential loop')

          // Check if the state differs.
          if(module.getExpectedState() !== module.on) {
            console.log('TODO: loop detected with different module. resume loop next frame')
          }
        }
      }
    }
  });
}
