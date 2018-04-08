import { Mesh, MeshPhongMaterial, SphereGeometry, } from 'three';

import steps from '../mapPoint';
import ticker$ from '../ticker';
import { getDistance, getMove } from '../utils';

import { Enemy } from './models';
import { ENEMY_COLOR, ENEMY_SCALE, ENEMY_SPEED } from './settings';
import { enemyMove$, enemyPassAllPaths$ } from './sinks';

const enemyMove = (enemy: Enemy) => { // TODO
    const nextStep = steps[enemy.step];
    if (!nextStep) {
        enemyPassAllPaths$.next(enemy);
        enemy.die();
    } else {
        const newDirections = getMove(enemy.position, nextStep, enemy.speed);
        enemy.position.x = newDirections.x;
        enemy.position.z = newDirections.z;
        if (getDistance(enemy.position.x, enemy.position.z, nextStep.x, nextStep.z) < enemy.speed) {
            enemy.step++;
        }
        enemyMove$.next(enemy);
    }
};

export const enemyFactory = (): Enemy => {
    const enemy: Enemy = new Mesh(
        new SphereGeometry(5, 32, 32),
        new MeshPhongMaterial({ color: ENEMY_COLOR })
    );
    enemy.dead = false;
    enemy.scale.set(ENEMY_SCALE, ENEMY_SCALE, ENEMY_SCALE);
    enemy.position.x = 0;
    enemy.position.y = 0;
    enemy.position.z = 0;
    enemy.step = 0;
    enemy.speed = ENEMY_SPEED;
    enemy.subscription = ticker$.subscribe(() => { // TODO to effect
        enemyMove(enemy);
    });
    enemy.die = () => {
        enemy.dead = true;
        enemy.subscription.unsubscribe();
    }

    return enemy;
};
