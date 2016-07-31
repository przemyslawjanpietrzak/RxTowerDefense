import createjs from 'easel';
import Rx from 'rx';

import getMove from './move';

export const enemy$ = new Rx.Subject();
export const enemiesMove$ = new Rx.Subject();

export function enemyFactory(stage, ticker) {
  const circle = new createjs.Shape();
  circle.actions = {
    die: new Rx.Subject(),
    move: new Rx.Subject(),
  };
  circle.step = 0;
  circle.speed = 2;
  circle.graphics.beginFill('red').drawCircle(0, 0, 5);

  circle.subscribsion = ticker.subscribe(
    () => {
      const newDirections = getMove(circle);
      circle.x = newDirections.x;
      circle.y = newDirections.y;
      circle.step = newDirections.step;

      circle.actions.move.onNext({ x: circle.x, y: circle.y });
      enemiesMove$.onNext({ x: circle.x, y: circle.y });
    }
  );

  circle.actions.move.subscribe(() => {
    // out of map
    if (circle.x > 500 || circle.y > 1000) {
      circle.actions.die.onNext();
    }
    // hit by bullet
  });

  circle.actions.die.subscribe(() => {
    stage.removeChild(circle);
    circle.actions.move.onCompleted();
    circle.actions.die.onCompleted();
    circle.subscribsion.completed();
  });

  stage.addChild(circle);
  enemy$.onNext(circle);
  return circle;
}
