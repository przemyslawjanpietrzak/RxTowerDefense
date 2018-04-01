import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/timeInterval';

import path from './path';
import ticker$ from './ticker';

import scenario from './scenario';

import { stage, stageClick$ } from './stage/stage';

import { runWallet } from './wallet/index';
import { changeWalletState$ } from './wallet/sinks';

import { runMenu } from './menu/index';
import {
    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
} from './menu/sinks';

import { runTower } from './tower/index';
import { newTower$, towerFireToEnemy$ } from './tower/sinks';

import { runBullet } from './bullet/index';
import { bulletHitEnemy$, bulletMove$ } from './bullet/sinks';

import { runEnemy } from './enemy/index';
import { enemyMove$, enemyPassAllPaths$ } from './enemy/sinks';

stage.addChild(path);

const sinks = {
    ticker$,

    stageClick$,

    newTower$,
    towerFireToEnemy$,

    bulletMove$,
    bulletHitEnemy$,

    enemyPassAllPaths$,
    enemyMove$,

    changeWalletState$,

    addTowerButtonClick$,
    cancelTowerButtonClick$,
    confirmTowerButtonClick$,
    playPauseButtonClick$,
};

runWallet(sinks);
runMenu(sinks);
runBullet(sinks);
runTower(sinks);
runEnemy(sinks);

let currentStep = 1;
ticker$
    .filter((counter) => counter / scenario.tickPerStep > currentStep)
    .subscribe(() => {
        currentStep++;
        document.getElementById('current-level').innerHTML = String(currentStep);
    });

ticker$
    .subscribe(() => {
        stage.update();
    });
