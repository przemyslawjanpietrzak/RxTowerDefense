import createjs from 'easel';
import Rx from 'rx';

export const tower$ = new Rx.Subject();

export function towerFactory(x, y, stage) {
  // const reloadBulltetTime = 5;
  const circle = new createjs.Shape();
  circle.graphics.beginFill('blue').drawCircle(x, y, 5);
  circle.actions = {
    fireToEnemy: new Rx.Subject(),
    range: new Rx.Subject(),
  };
  circle.range = 50;
  circle.reloadBulltetTime = 0;
  circle.fire = function towerFire(enemy) {
    circle.actions.fireToEnemy.onNext(enemy);
  };

  stage.addChild(circle);
  tower$.onNext({ x: circle.x, y: circle.y, range: circle.range });
}
