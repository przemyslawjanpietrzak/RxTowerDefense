import Victor from 'victor';

export const getDistance = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

export function getMove(position, destination, speed) {

  const vector: Vector = new Victor(destination.x - position.x, destination.y - position.y);
  const angle = vector.angle();
  const newX = position.x + speed * Math.cos(angle);
  const newY = position.y + speed * Math.sin(angle);

  return {
    x: newX,
    y: newY,
  };
}

export function isInDistance(tower: Tower, enemy: Enemy): boolean {
  return getDistance(tower.x, tower.y, enemy.x, enemy.y) <= tower.range;
}
