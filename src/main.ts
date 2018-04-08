import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/timeInterval';

import 'three/examples/js/controls/OrbitControls.js';
import 'three/examples/js/renderers/Projector.js';
import 'three/examples/js/renderers/CanvasRenderer'

import ticker$ from './ticker';

import scenario from './scenario';

import { runScene } from './scene/index';
import { sceneClick$ } from './scene/sinks';

// import { stage, stageClick$ } from './stage/stage';

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
import { enemyCreate$, enemyMove$, enemyPassAllPaths$ } from './enemy/sinks';

const sinks = { // TODO: spread
    ticker$,

    sceneClick$,

    // stageClick$,

    newTower$,
    towerFireToEnemy$,

    bulletMove$,
    bulletHitEnemy$,

    enemyPassAllPaths$,
    enemyMove$,
    enemyCreate$,

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
runScene(sinks);

let currentStep = 1;
ticker$
    .filter((counter) => counter / scenario.tickPerStep > currentStep)
    .subscribe(() => {
        currentStep++;
        document.getElementById('current-level').innerHTML = String(currentStep);
    });
