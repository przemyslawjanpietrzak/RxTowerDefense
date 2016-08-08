import createjs from 'easel';
import Rx from 'rx';

import stage from '../stage';
import ticker from '../ticker';
import { getMove, getDistance } from '../utils';
import steps from '../mapPoint';

export const enemy$ = new Rx.Subject();
export const enemiesMove$ = new Rx.Subject();

const die = (enemy: Enemy) => {
  stage.removeChild(enemy);
  enemy.actions.move.onCompleted();
  enemy.actions.die.onCompleted();
  enemy.subscription.completed();
};


export function enemyFactory() {
  const enemy: Enemy = new createjs.Shape();
  enemy.graphics.beginFill('red').drawCircle(0, 0, 5);
  enemy.actions = {
    die: new Rx.Subject(),
    move: new Rx.Subject(),
  };
  enemy.step = 0;
  enemy.speed = 2;
  enemy.die = function dieEnemy() {
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
        enemy.actions.move.onNext(enemy);
        enemiesMove$.onNext(enemy);
      }
    }
  );

  enemy.actions.move.subscribe(() => {
    // out of map
    if (enemy.x > 1000 || enemy.y > 1000) {
      enemy.actions.die.onNext();
    }
  });

  enemy.actions.die.subscribe(() => {
    die(enemy);
  });

  stage.addChild(enemy);
  enemy$.onNext(enemy);
  return enemy;
}
