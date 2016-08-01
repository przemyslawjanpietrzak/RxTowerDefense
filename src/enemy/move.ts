import steps from '../map';
import steps0 from '../map0';

export const getStepChange =
  (x, y, endX, endY, speed) => Math.abs(endX - x) <= speed && Math.abs(endY - y) <= speed;

// const getDirection = (position, destination, speed) => {
//   if (Math.abs(position - destination) < speed) {
//     return 0;
//   }
//   return destination > position ? 1 : -1;
// };

export default function getMove({ x, y, step, speed }) {
  const path: Vector = steps[step];
  // const directionX = getDirection(x, path.x, speed);
  // const directionY = getDirection(y, path.y, speed);

  const angle = path.angle();
  const newX = x + speed * Math.cos(angle);
  const newY = y + speed * Math.sin(angle);
  const isNextStep = getStepChange(x, y, steps0[step].x, steps0[step].y, speed);

  return {
    x: newX,
    y: newY,
    step: isNextStep ? step + 1 : step,
  };
}
