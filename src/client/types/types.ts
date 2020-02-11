import Module from './Moudle';

export type ModuleString = 'switch';

/** The game state. */
export interface GameState {
  /** All the game objects on the grid. */
  modules: Module[];
  /** The size of each of the tiles. */
  gridSize: 64;
  // TODO: Figure this out.
  /** The moudle on the cursor. */
  moudleInHand: any | null;
}
