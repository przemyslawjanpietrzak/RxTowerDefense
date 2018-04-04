import * as THREE from 'three';

import { Shape } from 'easeljs/lib/easeljs';

import { scene } from '../scene';

import steps from '../mapPoint';
import { enemy as settings } from '../settings';
import { stage } from '../stage/stage';
import ticker$ from '../ticker';
import { getDistance, getMove } from '../utils';

import { Enemy } from './models';

import { enemyMove$, enemyPassAllPaths$ } from './sinks';

const die = (enemy: Enemy) => {
    // stage.removeChild(enemy);
    enemy.subscription.unsubscribe();
};

const enemyMove = (enemy: any) => { // TODO
    const nextStep = steps[enemy.step];
    if (!nextStep) {
        enemyPassAllPaths$.next();
        enemy.die();
    } else {
        const newDirections = getMove({ x: enemy.position.x, y: enemy.position.z }, nextStep, enemy.speed);
        // console.log(newDirections);
        // console.log(enemy.position.x, enemy.position.y, enemy.position.z);
        enemy.position.x = newDirections.x;
        enemy.position.z = newDirections.z;
        if (getDistance(enemy.position.x, enemy.position.z, nextStep.x, nextStep.z) < enemy.speed) {
            enemy.step++;
        }
        enemyMove$.next(enemy);
    }
};

export const enemyFactory = (): Enemy => {
    const geometry =  new THREE.SphereGeometry( 5, 32, 32 );
    const material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    const enemy = new THREE.Mesh( geometry, material );
    enemy.scale.set(0.1, 0.1, 0.1);
    enemy.position.x = 0;
    enemy.position.y = 0;
    enemy.position.z = 0;

    enemy.step = 0;
    enemy.speed = settings.speed;
    enemy.die = () => {
        die(enemy);
    };

    enemy.subscription = ticker$.subscribe(() => { // TODO to effect
        enemyMove(enemy);
    });

    return enemy;
};
