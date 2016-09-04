import createjs from "easel";
import { Observable } from 'rxjs/Observable';

import stage from "./../stage/stage";
import ticker from "./../ticker";
import { getMove, getDistance } from "./../utils";
import { bullet as settings } from '../settings';

const die = (bullet: Bullet) => {
  bullets.splice(bullets.indexOf(bullet), 1);
  stage.removeChild(bullet);
  bullet.subscription.unsubscribe();
};

const bullets: Array<{ bullet: Bullet, enemy: Enemy} > = [];

export const bulletHitEnemy$ = ticker
  .flatMap(
    () => Observable.from(bullets)
  )
  .filter(
    (bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed
  );

export function bulletFactory(tower: Tower, enemy: Enemy): Bullet {
  const bullet: Bullet = new createjs.Shape();
  const { x: positionX, y: positionY } = tower;
  const { x: destinationX, y: destinationY } = enemy;

  bullet.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
  bullet.x = positionX;
  bullet.y = positionY;
  bullet.destinationX = destinationX;
  bullet.destinationY = destinationY;
  bullet.speed = settings.speed;
  bullet.enemy = enemy;
  bullet.die = () => die(bullet);

  bullet.subscription = ticker.subscribe(() => { // TODO move to file
    const newDirections = getMove(
      bullet,
      { x: destinationX, y: destinationY },
      bullet.speed
    );
    bullet.x = newDirections.x;
    bullet.y = newDirections.y;
  });

  bullets.push(bullet);
  stage.addChild(bullet);
  return bullet;
}

