import createjs from "easel";
import Rx from 'rxjs/Rx';

import { stage as settings, } from './../settings';
import { towerFactory } from '../tower/towers';

const stage: Stage = new createjs.Stage("canvas");
const shape: Shape = new createjs.Shape();

shape.graphics.beginFill(settings.color).drawRect(0, 0, 1000, 1000);
stage.addChild(shape);

export default stage;
export const stageClick$ = Rx.Observable.fromEvent(stage, 'click');
