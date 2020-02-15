import Module from './Module';

export type ModuleString = 'switch' | 'clock' | 'lamp' | 'and' | 'nand' | 'or' | 'nor' | 'not' | 'xor' | 'xnor';

export interface MouseCoordinates {
  x: number;
  y: number;
}
interface Camera {
  x: number;
  y: number;
  scale: number;
  wireOpacity: number;
}
interface IOAcceptance {
  accept: boolean;
  count: number;
}
export interface ModuleAcceptance {
  input: IOAcceptance;
  output: IOAcceptance;
}

/** The game state. */
export interface GameState {
  camera: Camera
  /** All the game objects on the grid. */
  modules: Module[];
  /** The size of each of the tiles. Should not change. */
  gridSize: 64;
  // TODO: Figure this out.
  /** The moudle on the cursor. */
  moduleInHand: any | null;
}
