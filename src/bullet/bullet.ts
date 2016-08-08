import createjs from "easel";
import Rx from "rx";

import stage from "./../stage";
import ticker from "./../ticker";
import { getMove, getDistance } from "./../utils";

export const bullet$ = new Rx.Subject();
export const bulletMove$ = new Rx.Subject();

const die = (bullet: Bullet) => {
  stage.removeChild(bullet);
  bullet.subscription.dispose();
};

export function bulletFactory(tower: Tower, enemy: Enemy): Bullet {
  const bullet: Bullet = new createjs.Shape();
  const { x: positionX, y: positionY } = tower;
  const { x: destinationX, y: destinationY } = enemy;

  bullet.graphics.beginFill("black").drawCircle(0, 0, 10);
  bullet.x = positionX;
  bullet.y = positionY;
  bullet.destinationX = destinationX;
  bullet.destinationY = destinationY;
  bullet.speed = 10;

  bullet.subscription = ticker.subscribe(() => { // TODO move to file
    const newDirections = getMove(
      bullet,
      { x: destinationX, y: destinationY },
      bullet.speed
    );
    bullet.x = newDirections.x;
    bullet.y = newDirections.y;

    if (getDistance(bullet.x,
        bullet.y,
        bullet.destinationX,
        bullet.destinationY
      ) <= bullet.speed) {
      enemy.die(); // TODO move to enemy file
      die(bullet);
    }

    bulletMove$.onNext(bullet);
  });


  bullet$.onNext(bullet);
  stage.addChild(bullet);
  return bullet;
}
