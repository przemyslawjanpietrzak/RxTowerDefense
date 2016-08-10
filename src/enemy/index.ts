import createjs from 'easel';
import { Subject } from 'rxjs/Subject';

import stage from '../stage';
import ticker from '../ticker';
import { getMove, getDistance } from '../utils';
import steps from '../mapPoint';

const die = (enemy: Enemy) => {
  stage.removeChild(enemy);
  enemy.subscription.unsubscribe();
};

export const enemiesMove$ = new Subject();

export function enemyFactory() {
  const enemy: Enemy = new createjs.Shape();
  enemy.graphics.beginFill('red').drawCircle(0, 0, 5);
  enemy.step = 0;
  enemy.speed = 2;
  enemy.die = function() {
    die(enemy);
  };
  enemy.subscription = ticker.subscribe(
    () => {
      const nextStep = [...steps][enemy.step];
      if (!nextStep) {
        enemy.die();
      } else {
        const newDirections = getMove(enemy, nextStep, enemy.speed);
        enemy.x = newDirections.x;
        enemy.y = newDirections.y;
        if (getDistance(enemy.x, enemy.y, nextStep.x, nextStep.y) < enemy.speed) {
          enemy.step++;
        }
        enemiesMove$.next(enemy);
      }
    }
  );

  stage.addChild(enemy);
  return enemy;
}
