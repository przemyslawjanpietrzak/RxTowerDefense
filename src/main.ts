import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/timeInterval';

import stage from "./stage/stage";

import { getTickerPerEnemy } from './utils';
import ticker from './ticker';
import path from "./path";

import './wallet/index';
import './menu/menu';
import "./engine";
import scenario from './scenario';
import './tower/index';
import './enemy/index';
import bulletEngine from './bullet/index';

import { runWallet } from './wallet/index';
import { enemyFactory } from "./enemy/enemy";

import { newTower$ } from './tower/index';
import { bulletHitEnemy$ } from './bullet/bullet';

stage.addChild(path);

bulletEngine();
runWallet({ newTower$, bulletHitEnemy$ });

let counter = 0;
ticker
  .filter(() => ++counter % getTickerPerEnemy(counter, scenario) === 0)
  .subscribe(() => {
    enemyFactory();
  });

ticker
  .subscribe(() => {
    stage.update();
  });