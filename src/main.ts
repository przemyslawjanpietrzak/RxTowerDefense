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

import { runWallet } from './wallet/index';
import { changeWalletState$ } from './wallet/sinks';

import { runMenu } from './menu/index';
import {
    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
} from './menu/sinks';

import { newTower$, towerFireToEnemy$ } from './tower/sinks';
import { runBullet } from './bullet/index';
import { bulletHitEnemy$, bullets$ } from './bullet/sinks';

import { enemyFactory } from "./enemy/enemy";

stage.addChild(path);


const sinks = {
    ticker$,

    newTower$,
    towerFireToEnemy$,

    bullets$,
    bulletHitEnemy$,

    changeWalletState$,

    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
};

runWallet(sinks);
runMenu(sinks);
runBullet(sinks);

let counter = 0; // TODO move to ticker's modules
ticker$
  .filter(() => ++counter % getTickerPerEnemy(counter, scenario) === 0)
  .subscribe(() => {
    enemyFactory();
  });

ticker$
  .subscribe(() => {
    stage.update();
  });