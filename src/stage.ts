import createjs from "easel";
import { stage as settings, } from './settings';

const stage: Stage = new createjs.Stage("canvas");
const shape: Shape = new createjs.Shape();

shape.graphics.beginFill(settings.color).drawRect(0, 0, 1000, 1000);
stage.addChild(shape);

export default stage;
