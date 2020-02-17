import Module from './Module';

/** All the modules. */
export type ModuleType = 'switch' | 'button' | 'clock' | 'lamp' | 'and' | 'nand' | 'or' | 'nor' | 'not' | 'xor' | 'xnor';
/** Version for loading and saving. */
type SaveVersion = 1;

/** Position of mouse. */
export interface MouseCoordinates {
  /** Mouse x. */
  x: number;
  /** Mouse y. */
  y: number;
}
interface IOAcceptance {
  /** Whether or not to accept wires. */
  accept: boolean;
  /** Amount of wires to accept. */
  count: number;
}
/** IO config for wiring. */
export interface ModuleAcceptance {
  /** Input settings. */
  input: IOAcceptance;
  /** Output settings. */
  output: IOAcceptance;
}

/** Game camera settings. */
interface Camera {
  /** Camera x. */
  x: number;
  /** Camera y. */
  y: number;
  /** The scale of the camera. */
  scale: number;
  /** Opacity from 0 to 1 of all wires. */
  wireOpacity: number;
}
/** The game state. */
export interface GameState {
  camera: Camera
  /** All the game objects on the grid. */
  modules: Module[];
  /** The size of each of the tiles. Should not change. */
  gridSize: number;
  // TODO: Figure this out.
  /** The moudle on the cursor. */
  moduleInHand: any | null;
}
interface SaveModule {
  type: ModuleType;
  id: string;

  x: number;
  y: number;

  on: boolean;

  inputs: string[];
  outputs: string[];
}
export interface SaveFormat {
  version: SaveVersion;
  camera: Camera;
  modules: SaveModule[];
  gridSize: number;
  moduleInHand: ModuleType;
}
