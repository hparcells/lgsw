import uuid from 'uuid';

import { ModuleType, ModuleAcceptance } from './types';

import RenderableObject from './RenderableObject';

abstract class Module extends RenderableObject {
  type: ModuleType;
  id: string;
  on: boolean = false;

  inputs: string[] = [];
  outputs: string[] = [];

  abstract accepts: ModuleAcceptance = null as any;
  
  constructor(moduleName: ModuleType) {
    super();

    this.type = moduleName;
    this.id = uuid()
  }

  abstract onClick(): void;
  abstract getExpectedState(): boolean | void;
  abstract doLogic(originId?: string): void;
}

export default Module;
