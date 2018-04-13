import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import { enemyMove$ } from '../enemy/sinks';
import ticker$ from '../ticker';

import { getDistance, isInDistance } from '../utils';

import { Event } from '../common/models';
import { Enemy } from '../enemy/models';
import { scene } from '../scene/scene';

import { hideTowerArea, toggleAreaFactory } from './area';
import { Tower } from './models';
import { RELOAD_BULLET_TIME, TOWER_COLOR, TOWER_RANGE, TOWER_ROTATION, TOWER_SIZE, TOWER_Y } from './settings';
import { towerFireToEnemy$ } from './sinks';

export const towerFactory = (x: number, z: number): Tower => {

    const tower = new Mesh(
        new BoxGeometry(TOWER_SIZE, TOWER_SIZE, TOWER_SIZE),
        new MeshPhongMaterial({ color: TOWER_COLOR }),
    ) as Tower;
    tower.position.set(x, TOWER_Y, z);
    scene.add(tower);

    tower.range = TOWER_RANGE;
    tower.reloadBulletTime = 0;
    tower.enemiesInRange = [];

    tower.onClickHandler = toggleAreaFactory(tower);
    tower.addEventListener('click', tower.onClickHandler);

    tower.fireToEnemy = (enemy: Enemy) => {
        towerFireToEnemy$.next({ tower, enemy });
        tower.reloadBulletTime = RELOAD_BULLET_TIME;
    };

    tower.tickerSubscription = ticker$.subscribe(() => {
        tower.rotation.y += TOWER_ROTATION;

        if (tower.reloadBulletTime > 0) {
            tower.reloadBulletTime--;
        }
    });

    tower.enemySubscription = enemyMove$
        .filter(() => tower.reloadBulletTime === 0)
        .subscribe((enemy: Enemy) => {
            if (isInDistance(tower, enemy.position)) {
                tower.enemiesInRange.push(enemy);
            }
            const firstEnemy: Enemy = tower.enemiesInRange[0];
            if (firstEnemy) {
                tower.fireToEnemy(firstEnemy);
            }

            tower.enemiesInRange = [];
        });

    return tower;
};
