import createjs from 'easel';

import stage from './../stage/stage';
import ticker from './../ticker';
import { getMove } from './../utils';
import { bullet as settings } from '../settings';

const die = (bullet: Bullet) => {
  stage.removeChild(bullet);
  bullet.subscription.unsubscribe();
};

export const bullets: Array<Bullet> = [];

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

