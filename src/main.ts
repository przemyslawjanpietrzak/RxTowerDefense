import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/timeInterval';

import stage from "./stage/stage";

import { getTickerPerEnemy } from './utils';
import ticker from './ticker';
import path from "./path";

import './wallet/index';
import './menu/index';
import "./engine";
import scenario from './scenario';
import './tower/index';
import './enemy/index';
import bulletEngine from './bullet/index';

import changeWalletState$, { runWallet } from './wallet/index';
import { runMenu } from './menu/index';
import {
    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
} from './menu/sinks';

import { enemyFactory } from "./enemy/enemy";

import { newTower$ } from './tower/index';
import { bulletHitEnemy$ } from './bullet/bullet';

stage.addChild(path);

bulletEngine();

const sinks = {
    newTower$,
    bulletHitEnemy$,
    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
    changeWalletState$,
};
runWallet(sinks);
runMenu(sinks);

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