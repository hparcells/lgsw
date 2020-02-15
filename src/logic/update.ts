import { state } from './logic';

export function updateModules(moduleId: string, modules: string[], origin?: string) {
  modules.map((outputId) => {
    return state.modules.find((moudle) => {
      return moudle.id === outputId;
    });
  }).forEach((module) => {
    if(module?.id !== origin) {
      module?.doLogic(moduleId);
    } 
  });
}
