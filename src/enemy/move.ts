import paths from '../map';

export const getStepChange =
  (x, y, endX, endY, speed) => Math.abs(endX - x) <= speed && Math.abs(endY - y) <= speed;

const getDirection = (position, destination, speed) => {
  if (Math.abs(position - destination) < speed) {
    return 0;
  }
  return destination > position ? 1 : -1;
};

export default function getMove({ x, y, step, speed }) {
  const path = paths[step];
  const directionX = getDirection(x, path.x, speed);
  const directionY = getDirection(y, path.y, speed);

  const newX = x + directionX * speed;
  const newY = y + directionY * speed;
  const isNextStep = getStepChange(x, y, path.x, path.y, speed);

  return {
    x: newX,
    y: newY,
    step: isNextStep ? step + 1 : step,
  };
}
