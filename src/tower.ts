import createjs from 'easel';
import Rx from 'rx';

import stage from './stage';
import ticker from './ticker';

export const tower$ = new Rx.Subject();
export const towerFireToEnemy$ = new Rx.Subject();

export function towerFactory(x, y) {
  const reloadBulltetTime = 100;
  const tower = new createjs.Shape();
  tower.graphics.beginFill('blue').drawCircle(0, 0, 5);
  tower.x = x;
  tower.y = y;
  tower.range = 250;
  tower.reloadBulltetTime = 0; d
  tower.fireToEnemy = function towerFireToEnemy(enemy) {
    towerFireToEnemy$.onNext({ tower, enemy });
    tower.reloadBulltetTime = reloadBulltetTime;
  };

  tower.subscribsion = ticker.subscribe(
    () => {
      if (tower.reloadBulltetTime > 0) {
        tower.reloadBulltetTime--;
      }
    }
  );

  stage.addChild(tower);
  tower$.onNext(tower);
  return tower;
}
