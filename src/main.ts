import Rx from 'rx';

import stage from './stage';
import { enemyFactory } from './enemy/index';
import { towerFactory } from './tower';
import path from './path';
import './engine';

stage.addChild(path);
stage.update();

enemyFactory();
towerFactory(450, 300);

Rx.Observable
  .interval(333)
  .timeInterval()
  .subscribe(() => {
    enemyFactory(stage);
  });
// engine();
