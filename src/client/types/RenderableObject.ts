abstract class RenderableObject {
  x: number = 0;
  y: number = 0;

  abstract render(): void;
}

export default RenderableObject;
