import * as createjs from 'easeljs/lib/easeljs';

import stage, { stageClick$ } from '../stage/stage';
import { enemyMove$, } from '../enemy/sinks';
import ticker$ from '../ticker';

import { isInDistance, getDistance } from '../utils';
import { tower as settings } from '../settings';

import { getArea, toogleAreaFactory, hideTowerArea } from './area';
import { towerFireToEnemy$ } from './sinks';


export function towerFactory(x: number, y: number): Tower {
    const reloadBulletTime = 100;
    const tower: Tower = new createjs.Shape();
    tower.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
    tower.x = x;
    tower.y = y;
    tower.range = settings.range;
    tower.reloadBulletTime = 0;
    tower.enemiesInRange = [];
    tower.areaVisible = false;
    tower.area = getArea(tower);

    tower.onClickHandler = toogleAreaFactory(tower);
    tower.addEventListener('click', tower.onClickHandler);
    tower.fireToEnemy = function towerFireToEnemy(enemy: Enemy) {
        towerFireToEnemy$.next({ tower, enemy });
        tower.reloadBulletTime = reloadBulletTime;
    };

    tower.die = () => {
        stage.removeChild(tower);
        tower.enemySubscription.unsubscribe();
        tower.stageClickSubscription.unsubscribe();
        tower.tickerSubscription.unsubscribe();
        tower.removeEventListener('click');
    };

    tower.tickerSubscription = ticker$.subscribe(() => {
        if (tower.reloadBulletTime > 0) {
            tower.reloadBulletTime--;
        }
    });

    tower.enemySubscription = enemyMove$
        .filter(() => tower.reloadBulletTime === 0)
        .subscribe((enemy: Enemy) => {
            if (isInDistance(tower, enemy)) {
                tower.enemiesInRange.push(enemy);
            }
            const firstEnemy: Enemy = tower.enemiesInRange[0];
            if (firstEnemy) {
                tower.fireToEnemy(firstEnemy);
            }

            tower.enemiesInRange = [];
        });

    tower.stageClickSubscription = stageClick$
      .filter((event) => getDistance(event.stageX, event.stageY, tower.x, tower.y) > settings.size) // click out of tower
      .subscribe(() => {
        hideTowerArea(tower);
      });

    stage.addChild(tower);
    return tower;
}
