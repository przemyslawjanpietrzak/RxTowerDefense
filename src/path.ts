import createjs from "easel";

import steps from "./map";

const line: Shape = new createjs.Shape();
line.graphics.beginStroke("black");

const [firstStep, ...restSteps] = steps;
line.graphics.moveTo(firstStep.x, firstStep.y);

restSteps.forEach(({ x, y }) => {
  line.graphics.lineTo(x, y);
});

export default line;
