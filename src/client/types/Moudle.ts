import uuid from 'uuid';

import { ModuleString } from './types';

import RenderableObject from './RenderableObject';

abstract class Module extends RenderableObject {
  moduleName: ModuleString;
  id: string;
  inputs: string[] = [];
  outputs: string[] = [];
  
  constructor(moduleName: ModuleString) {
    super();

    this.moduleName = moduleName;
    this.id = uuid()
  }

  abstract onClick(): void;
}

export default Module;
