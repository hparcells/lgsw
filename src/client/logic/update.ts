import { state } from './logic';

export default function updateModules() {
  state.modules.forEach((module) => {
    return module.doLogic();
  });
}