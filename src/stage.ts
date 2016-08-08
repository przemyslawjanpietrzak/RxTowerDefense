import createjs from "easel";

const stage: Stage = new createjs.Stage("canvas");
const shape: Shape = new createjs.Shape();

shape.graphics.beginFill("green").drawRect(0, 0, 1000, 1000);
stage.addChild(shape);

export default stage;
