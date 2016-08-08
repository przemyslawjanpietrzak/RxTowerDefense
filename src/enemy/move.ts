import steps from '../map';
import steps0 from '../mapPoint';

export const getStepChange =
  (x, y, endX, endY, speed) => Math.abs(endX - x) <= speed && Math.abs(endY - y) <= speed;

export default function getMove({ x, y, step, speed }) {
  const path: Vector = steps[step];
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
