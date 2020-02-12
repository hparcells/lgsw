import Module from './Module';

export type ModuleString = 'switch' | 'light';

export interface MouseCoordinates {
  x: number;
  y: number;
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
  /** All the game objects on the grid. */
  modules: Module[];
  /** The size of each of the tiles. */
  gridSize: 64;
  // TODO: Figure this out.
  /** The moudle on the cursor. */
  moduleInHand: any | null;
}
