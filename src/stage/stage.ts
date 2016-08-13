import createjs from "easel";
import { stage as settings, } from './../settings';
import { towerFactory } from '../tower/towers';

const stage: Stage = new createjs.Stage("canvas");
const shape: Shape = new createjs.Shape();

shape.graphics.beginFill(settings.color).drawRect(0, 0, 1000, 1000);
shape.addEventListener('dblclick', (event) => {
	towerFactory(event.stageX, event.stageY);
});

stage.addChild(shape);

export default stage;
