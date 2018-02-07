import * as createjs from 'easeljs/lib/easeljs';
import { Observable } from 'rxjs/Rx';

import { stage as settings, } from './../settings';

const stage: Stage = new createjs.Stage("canvas");
const shape: Shape = new createjs.Shape();

shape.graphics.beginFill(settings.color).drawRect(0, 0, 700, 500);
stage.addChild(shape);

export default stage;
export const stageClick$ = Observable.fromEvent(stage as any, 'click');
