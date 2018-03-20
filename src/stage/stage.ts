import * as createjs from 'easeljs/lib/easeljs';
import { Observable } from 'rxjs/Rx';

import { stage as settings } from './../settings';

const SHAPE_WIDTH = 700;
const SHAPE_HEIGHT = 500;

const stage: Stage = new createjs.Stage('canvas');
const shape: Shape = new createjs.Shape();

shape.graphics.beginFill(settings.color).drawRect(0, 0, SHAPE_WIDTH, SHAPE_HEIGHT);
stage.addChild(shape);

export default stage;
export const stageClick$ = Observable.fromEvent(stage as any, 'click');
