import { Mesh, BoxGeometry, MeshPhongMaterial } from 'three';

import { enemyMove$ } from '../enemy/sinks';
import ticker$ from '../ticker';

import { tower as settings } from '../settings';
import { getDistance, isInDistance } from '../utils';

import { Event } from '../common/models';
import { Enemy } from '../enemy/models';
import { scene } from '../scene/scene'; // TODO to effect

import { hideTowerArea, toggleAreaFactory } from './area';
import { Tower } from './models';
import { TOWER_COLOR, RELOAD_BULLET_TIME } from './settings';
import { towerFireToEnemy$ } from './sinks';

export const towerFactory = (x: number, z: number): Tower => {

    const tower: Tower = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshPhongMaterial({ color: TOWER_COLOR })
    );
    tower.position.x = x;
    tower.position.y = 2;
    tower.position.z = z;
    scene.add(tower);

    tower.range = 3;
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
        tower.rotation.x += 0.1;
        tower.rotation.y += 0.1;
        tower.rotation.z += 0.1;

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
