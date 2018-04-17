import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';

import { getDistance, getMove } from '../common/utils';

import steps from '../mapPoint';
import ticker$ from '../ticker';

import { Enemy } from './models';
import { ENEMY_COLOR, ENEMY_RADIUS, ENEMY_SCALE, ENEMY_SIZE, ENEMY_SPEED } from './settings';
import { enemyMove$, enemyPassAllPaths$ } from './sinks';

const enemyMove = (enemy: Enemy) => {
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
    const enemy = new Mesh(
        new SphereGeometry(ENEMY_RADIUS, ENEMY_SIZE, ENEMY_SIZE),
        new MeshPhongMaterial({ color: ENEMY_COLOR }),
    ) as Enemy;
    enemy.dead = false;
    enemy.scale.set(ENEMY_SCALE, ENEMY_SCALE, ENEMY_SCALE);
    enemy.position.x = 0;
    enemy.position.y = 0;
    enemy.position.z = 0;
    enemy.step = 0;
    enemy.speed = ENEMY_SPEED;
    enemy.subscription = ticker$.subscribe(() => {
        enemyMove(enemy);
    });
    enemy.die = () => {
        enemy.dead = true;
        enemy.subscription.unsubscribe();
    };

    return enemy;
};
