import uuid from 'uuid';

import RenderableObject from './RenderableObject';

abstract class Module extends RenderableObject {
  constructor() {
    super();

    this.id = uuid();
  }

  id: string;
  inputs: string[] = [];
  outputs: string[] = [];
}

export default Module;
