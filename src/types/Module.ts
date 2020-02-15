import uuid from 'uuid';

import { ModuleString, ModuleAcceptance } from './types';

import RenderableObject from './RenderableObject';

abstract class Module extends RenderableObject {
  moduleName: ModuleString;
  id: string;
  on: boolean = false;

  inputs: string[] = [];
  outputs: string[] = [];

  abstract accepts: ModuleAcceptance = null as any;
  
  constructor(moduleName: ModuleString) {
    super();

    this.moduleName = moduleName;
    this.id = uuid()
  }

  abstract onClick(): void;
  abstract getExpectedState(): boolean | void;
  abstract doLogic(originId?: string): void;
}

export default Module;
