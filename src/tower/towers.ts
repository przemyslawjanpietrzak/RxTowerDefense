import createjs from "easel";
import { Subject } from "rx";

import stage from "../stage";
import ticker from "../ticker";

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
    tower.fireToEnemy = function towerFireToEnemy(enemy) {
        towerFireToEnemy$.onNext({ tower, enemy });
        tower.reloadBulletTime = reloadBulletTime;
    };

    tower.subscribsion = ticker.subscribe(
        () => {
            if (tower.reloadBulletTime > 0) {
                tower.reloadBulletTime--;
            }
        }
    );

    stage.addChild(tower);
    tower$.onNext(tower);
    return tower;
}
