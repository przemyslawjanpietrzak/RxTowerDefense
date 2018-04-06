import { Mesh, MeshPhongMaterial, SphereGeometry, } from 'three';

import steps from '../mapPoint';
import { enemy as settings } from '../settings';
import { stage } from '../stage/stage';
import ticker$ from '../ticker';
import { getDistance, getMove } from '../utils';

import { Enemy } from './models';
import { ENEMY_COLOR } from './settings';
import { enemyMove$, enemyPassAllPaths$ } from './sinks';

const enemyMove = (enemy: Enemy) => { // TODO
    const nextStep = steps[enemy.step];
    if (!nextStep) {
        enemyPassAllPaths$.next();
        enemy.die();
    } else {
        const newDirections = getMove({ x: enemy.position.x, y: enemy.position.z }, nextStep, enemy.speed);
        enemy.position.x = newDirections.x;
        enemy.position.z = newDirections.z;
        if (getDistance(enemy.position.x, enemy.position.z, nextStep.x, nextStep.z) < enemy.speed) {
            enemy.step++;
        }
        enemyMove$.next(enemy);
    }
};

export const enemyFactory = (): Enemy => {
    const geometry =  new SphereGeometry(5, 32, 32);
    const material = new MeshPhongMaterial( {color: ENEMY_COLOR} );
    const enemy = new Mesh( geometry, material );
    enemy.scale.set(0.1, 0.1, 0.1);
    enemy.position.x = 0;
    enemy.position.y = 0;
    enemy.position.z = 0;
    enemy.step = 0;
    enemy.speed = settings.speed;
    enemy.subscription = ticker$.subscribe(() => { // TODO to effect
        enemyMove(enemy);
    });
    enemy.die = enemy.subscription.unsubscribe;

    return enemy;
};
