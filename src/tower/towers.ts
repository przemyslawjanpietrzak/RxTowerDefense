import createjs from "easel";
import { Subject } from "rx";

import stage from "../stage";
import ticker from "../ticker";
import { enemiesMove$, } from '../enemy/index';
import { isInDistance } from "../utils";

export const tower$ = new Subject();
export const towerFireToEnemy$ = new Subject();

export function towerFactory(x: number, y: number): Tower {
    const reloadBulletTime = 100;
    const tower: Tower = new createjs.Shape();
    tower.graphics.beginFill("blue").drawCircle(0, 0, 5);
    tower.x = x;
    tower.y = y;
    tower.range = 250;
    tower.reloadBulletTime = 0;
    tower.enemiesInRange = [];
    tower.fireToEnemy = function towerFireToEnemy(enemy: Enemy) {
        towerFireToEnemy$.onNext({ tower, enemy });
        tower.reloadBulletTime = reloadBulletTime;
    };

    tower.subscribsion = ticker.subscribe(
        () => {
            const firstEnemy: Enemy = tower.enemiesInRange[0];
            if (firstEnemy) {
                tower.fireToEnemy(firstEnemy);
            }
            if (tower.reloadBulletTime > 0) {
                tower.reloadBulletTime--;
            }
            tower.enemiesInRange = [];
        }
    );

    tower.enemySubscription = enemiesMove$.subscribe((enemy: Enemy) => {
        if (isInDistance(tower, enemy) && tower.reloadBulletTime === 0) {
            tower.enemiesInRange.push(enemy);
        }
    });

    stage.addChild(tower);
    tower$.onNext(tower);
    return tower;
}
