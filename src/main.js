import createjs from 'easel';
import Rx from 'rx';


import { enemyFactory } from './enemy/index';
import { towerFactory } from './tower';
import path from './path';

// import engine from './engine';
const stage = new createjs.Stage('canvas');
const shape = new createjs.Shape();
shape.graphics.beginFill('green').drawRect(0, 0, 1000, 500);


stage.addChild(shape);
stage.addChild(path);
stage.update();

const ticker = Rx.Observable
  .interval(17)
  .timeInterval()
  .tap(() => {
    stage.update();
  });

enemyFactory(stage, ticker);
towerFactory(450, 300, stage, ticker);


Rx.Observable
  .interval(670)
  .timeInterval()
  .subscribe(() => {
    enemyFactory(stage, ticker);
  });

// engine();
