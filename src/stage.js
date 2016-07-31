import createjs from 'easel';

const stage = new createjs.Stage('canvas');
const shape = new createjs.Shape();
shape.graphics.beginFill('green').drawRect(0, 0, 1000, 500);
stage.addChild(shape);

export default stage;
