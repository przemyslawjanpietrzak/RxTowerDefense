import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/timeInterval';

import './orbit.ts';
// import './canvasRenderer';
import 'three/examples/js/renderers/Projector.js';
import 'three/examples/js/renderers/CanvasRenderer'

import path from './path';
import ticker$ from './ticker';

import scenario from './scenario';

import { scene, cube, controls, renderer, camera } from './scene';

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
import { enemyCreate$, enemyMove$, enemyPassAllPaths$ } from './enemy/sinks';

scene.add(path);

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

enemyCreate$.subscribe((enemy: any) => {
    scene.add(enemy);
});

enemyPassAllPaths$.subscribe((enemy) => {
    stage.remove(enemy);
});

const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    controls.update();

    requestAnimationFrame( animate );
    renderer.render(scene, camera);
};

animate();