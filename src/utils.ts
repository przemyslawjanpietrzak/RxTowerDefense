export const getDistance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const getDirection = (position: number, destination: number, speed: number): number => {
  if (Math.abs(position - destination) < speed * 1.43) {
    return 0;
  }
  return destination > position ? 1 : -1;
};

export function getMove(position, destination, speed) {
  const directionX = getDirection(position.x, destination.x, speed);
  const directionY = getDirection(position.y, destination.y, speed);

  const newX = position.x + directionX * speed;
  const newY = destination.y + directionY * speed;
  return {
    x: newX,
    y: newY,
  };
}

export function isInDistance(tower: Tower, enemy: Enemy): boolean {
  return getDistance(tower.x, tower.y, enemy.x, enemy.y) <= tower.range;
}
