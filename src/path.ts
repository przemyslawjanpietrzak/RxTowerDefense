import * as createjs from 'easeljs/lib/easeljs';

import { Shape } from './common/models';

import steps from './mapPoint';

const line: Shape = new createjs.Shape();
line.graphics.beginStroke('black');
line.graphics.moveTo(0, 0);

steps.forEach(({ x, y }) => {
    line.graphics.lineTo(x, y);
});

export default line;
