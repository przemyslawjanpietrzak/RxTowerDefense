import createjs from 'easel';
import Rx from 'rx';

import enemyFactory from './enemy';
import path from './path';

const stage = new createjs.Stage('canvas');
const shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 1000, 500);

stage.addChild(shape);
var polygon = new createjs.Shape();
polygon.graphics.beginStroke("black");
polygon.graphics.moveTo(0, 60).lineTo(60, 60).lineTo(30, 90).lineTo(0, 60);

stage.addChild(path);
stage.update();

const ticker = Rx.Observable
  .interval(17)
  .timeInterval();

enemyFactory(stage, ticker);

Rx.Observable
  .interval(670)
  .timeInterval()
  .subscribe(() => {
    enemyFactory(stage, ticker);
  });
