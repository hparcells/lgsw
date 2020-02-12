export let shouldDrawHoveredTile = true;
export let isWiring = false;

export function disableWiring() {
  isWiring = false;
  shouldDrawHoveredTile = true;
}
export function toggleWiring() {
  isWiring = !isWiring;
  shouldDrawHoveredTile = !shouldDrawHoveredTile;
}
