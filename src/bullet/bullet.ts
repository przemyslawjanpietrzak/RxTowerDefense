import createjs from "easel";
import Rx from "rx";

import stage from "./../stage";
import ticker from "./../ticker";
import { getMove, getDistance } from "./../utils";

export const bullet$ = new Rx.Subject();
export const bulletMove$ = new Rx.Subject();

export function bulletFactory(tower, enemy) {
  const bullet = new createjs.Shape();
  const { x: positionX, y: positionY } = tower;
  const { x: destinationX, y: destinationY } = enemy;

  bullet.graphics.beginFill("black").drawCircle(0, 0, 10);
  bullet.x = positionX;
  bullet.y = positionY;
  bullet.destinationX = destinationX;
  bullet.destinationY = destinationY;
  bullet.speed = 10;
  bullet.actions = {
    die: new Rx.Subject(),
    move: new Rx.Subject(),
  };

  bullet.die = () => {
    stage.removeChild(bullet);
    bullet.subscribcion.completed();
    bullet.moveSubscription.completed();
    bullet.actions.move.onCompleted();
    bullet.actions.die.onCompleted();
  };

  bullet.subscribcion = ticker.subscribe(() => {
    const newDirections = getMove(
      bullet,
      { x: destinationX, y: destinationY },
      bullet.speed
    );
    bullet.x = newDirections.x;
    bullet.y = newDirections.y;

    bullet.actions.move.onNext(bullet);
    bulletMove$.onNext(bullet);
  });

  bullet.moveSubscription = bullet.actions.move.subscribe((movedBullet) => {
    if (getDistance(
        movedBullet.x,
        movedBullet.y,
        movedBullet.destinationX,
        movedBullet.destinationY
      ) < movedBullet.speed * 1.43) {
      stage.removeChild(movedBullet);
      movedBullet.actions.move.onCompleted();
      movedBullet.actions.die.onCompleted();
      movedBullet.moveSubscription.dispose();
      enemy.die();
    }
  });

  bullet$.onNext(bullet);
  stage.addChild(bullet);
  return bullet;
}
