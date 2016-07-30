import createjs from 'easel';
import Rx from 'rx';

import enemyFactory from './enemy';

const stage = new createjs.Stage('canvas');
const shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 1000, 500);

stage.addChild(shape);
stage.update();

const ticker = Rx.Observable
  .interval(17)
  .timeInterval();

enemyFactory(stage, ticker);

Rx.Observable
  .interval(150)
  .timeInterval()
  .subscribe(() => {
    enemyFactory(stage, ticker);
  });
