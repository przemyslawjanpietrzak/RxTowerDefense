import Victor from 'victor';
import steps from './map0';

const firstStep = {
  x: 0,
  y: 0,
};


const allSteps = [firstStep, ...steps];
export default steps.map(({ x, y }, index) => new Victor(x - allSteps[index].x, y - allSteps[index].y));
