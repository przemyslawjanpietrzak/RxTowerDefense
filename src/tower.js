import createjs from 'easel';
import Rx from 'rx';

export const tower$ = new Rx.Subject();
export const towerFireToEnemy$ = new Rx.Subject();

export function towerFactory(x, y, stage) {
  // const reloadBulltetTime = 5;
  const tower = new createjs.Shape();
  tower.graphics.beginFill('blue').drawtower(x, y, 5);
  tower.range = 50;
  tower.reloadBulltetTime = 0;
  tower.fire = function towerFire(enemy) {
    towerFireToEnemy$.onNext({ tower, enemy });
  };

  stage.addChild(tower);
  tower$.onNext({ x: tower.x, y: tower.y, range: tower.range });
  return tower;
}
