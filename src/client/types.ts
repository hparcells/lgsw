interface Camera {
  x: number;
  y: number;
  scale: number;
}

export interface GameState {
  objects: any[];
  camera: Camera;
}
