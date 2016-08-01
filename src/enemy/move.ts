import paths from '../map';
import { getMove } from '../utils';

export const getStepChange =
  (x, y, endX, endY, speed) => Math.abs(endX - x) <= speed && Math.abs(endY - y) <= speed;

export default function getMoveWithStep({ x, y, step, speed }) {
  const path = paths[step];
  const { x: newX, y: newY } = getMove({x, y}, path, speed);
  const isNextStep = getStepChange(x, y, path.x, path.y, speed);

  return {
    x: newX,
    y: newY,
    step: isNextStep ? step + 1 : step,
  };
}
