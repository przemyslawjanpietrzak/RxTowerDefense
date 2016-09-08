import createjs from 'easel';
import Rx from 'rxjs/Rx';

import stage from '../stage/stage';
import ticker from '../ticker';
import steps from '../mapPoint';
import { getMove, getDistance } from '../utils';
import { enemy as settings, } from '../settings';

const die = (enemy: Enemy) => {
  enemies.splice(enemies.indexOf(enemy), 1);
  stage.removeChild(enemy);
  enemy.subscription.unsubscribe();
};

const enemyMove = (enemy: Enemy) => {
  const nextStep = steps[enemy.step];
  if (!nextStep) {
    enemy.die();
  } else {
    const newDirections = getMove(enemy, nextStep, enemy.speed);
    enemy.x = newDirections.x;
    enemy.y = newDirections.y;
    if (getDistance(enemy.x, enemy.y, nextStep.x, nextStep.y) < enemy.speed) {
      enemy.step++;
    }
  }
};

const enemies: Array<Enemy> = [];

export function enemyFactory() {
  const enemy: Enemy = new createjs.Shape();
  enemy.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
  enemy.step = 0;
  enemy.speed = settings.speed;
  enemy.die = function() {
    die(enemy);
  };

  enemy.subscription = ticker.subscribe(() => {
      enemyMove(enemy);
    }
  );

  enemies.push(enemy);
  stage.addChild(enemy);
  return enemy;
}

export const enemiesMove$ = ticker.flatMap(() => Rx.Observable.from(enemies));