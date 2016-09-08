import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/timeInterval';

import stage from "./stage/stage";

import { getTickerPerEnemy } from './utils';
import ticker$ from './ticker';
import path from "./path";

import './wallet/index';
import './menu/index';
import scenario from './scenario';
import './tower/index';
import './enemy/index';
import './bullet/index';

import changeWalletState$, { runWallet } from './wallet/index';
import { runMenu } from './menu/index';
import {
    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
} from './menu/sinks';

import { enemyFactory } from "./enemy/enemy";

import { newTower$, towerFireToEnemy$ } from './tower/sinks';
import { runBullet } from './bullet/index';
import { bulletHitEnemy$, bullets$ } from './bullet/sinks';

stage.addChild(path);


const sinks = {
    newTower$,
    bullets$,
    ticker$,
    bulletHitEnemy$,
    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
    changeWalletState$,
    towerFireToEnemy$,
};
runWallet(sinks);
runMenu(sinks);
runBullet(sinks);

let counter = 0;
ticker$
  .filter(() => ++counter % getTickerPerEnemy(counter, scenario) === 0)
  .subscribe(() => {
    enemyFactory();
  });

ticker$
  .subscribe(() => {
    stage.update();
  });