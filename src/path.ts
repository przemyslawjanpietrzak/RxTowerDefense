import createjs from "easel";

import steps from "./map";

const line: Shape = new createjs.Shape();
line.graphics.beginStroke("black");

line.graphics.moveTo(0, 0);

let cacheX = 0;
let cacheY = 0;
steps.forEach(({ x, y }) => {
  line.graphics.lineTo(cacheX + x, cacheY + y);
  cacheX += x;
  cacheY += y;

});

export default line;
