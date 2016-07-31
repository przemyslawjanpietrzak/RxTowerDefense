import createjs from 'easel';
import Rx from 'rx';

import stage from './stage';
import ticker from './ticker';
import { getMove } from './utils';

export function bulletFactory(
  { x: positionX, y: positionY },
  { x: destinationX, y: destinationY }
) {
  const bullet = new createjs.Shape();
  bullet.graphics.beginFill('black').drawbullet(positionX, positionY, 2);
  bullet.actions = {
    die: new Rx.Subject(),
    move: new Rx.Subject(),
  };

  bullet.die = () => {
    stage.removeChild(bullet);
    bullet.subscribcion.completed();
    bullet.actions.move.onCompleted();
  };

  bullet.subscribcion = ticker.subscribe(() => {
    const newDirections = getMove(
      { x: positionX, y: positionY },
      { x: destinationX, y: destinationY },
      bullet.speed
    );
    bullet.x = newDirections.x;
    bullet.y = newDirections.y;
    bullet.step = newDirections.step;

    bullet.actions.move.onNext({ x: bullet.x, y: bullet.y });
  });

  stage.addChild(bullet);
  return bullet;
}
