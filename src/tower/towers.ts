import { Mesh, BoxGeometry, MeshPhongMaterial } from 'three';

import { enemyMove$ } from '../enemy/sinks';
import ticker$ from '../ticker';

import { getDistance, isInDistance } from '../utils';

import { Event } from '../common/models';
import { Enemy } from '../enemy/models';
import { scene } from '../scene/scene'; // TODO to effect

import { hideTowerArea, toggleAreaFactory } from './area';
import { Tower } from './models';
import { TOWER_COLOR, RELOAD_BULLET_TIME, TOWER_RANGE, TOWER_ROTATION, TOWER_SIZE, TOWER_Y } from './settings';
import { towerFireToEnemy$ } from './sinks';

export const towerFactory = (x: number, z: number): Tower => {

    const tower: Tower = new Mesh(
        new BoxGeometry(TOWER_SIZE, TOWER_SIZE, TOWER_SIZE),
        new MeshPhongMaterial({ color: TOWER_COLOR })
    );
    tower.position.x = x;
    tower.position.y = TOWER_Y;
    tower.position.z = z;
    scene.add(tower);

    tower.range = TOWER_RANGE;
    tower.reloadBulletTime = 0;
    tower.enemiesInRange = [];
    // tower.areaVisible = false;
    // tower.area = getArea(tower);

    tower.onClickHandler = toggleAreaFactory(tower);
    tower.addEventListener('click', tower.onClickHandler);

    tower.fireToEnemy = (enemy: Enemy) => {
        towerFireToEnemy$.next({ tower, enemy });
        tower.reloadBulletTime = RELOAD_BULLET_TIME;
    };

    tower.die = () => {
        // stage.removeChild(tower);
        // tower.enemySubscription.unsubscribe();
        // tower.stageClickSubscription.unsubscribe();
        // tower.tickerSubscription.unsubscribe();
        // tower.removeEventListener('click');
    };

    tower.tickerSubscription = ticker$.subscribe(() => {
        tower.rotation.x += TOWER_ROTATION;
        tower.rotation.y += TOWER_ROTATION;
        tower.rotation.z += TOWER_ROTATION;

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
