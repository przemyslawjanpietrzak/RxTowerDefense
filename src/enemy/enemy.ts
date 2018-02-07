import * as createjs from 'easeljs/lib/easeljs';

import stage from '../stage/stage';
import ticker$ from '../ticker';
import steps from '../mapPoint';
import { getMove, getDistance } from '../utils';
import { enemy as settings, } from '../settings';

import { enemyPassAllPaths$, enemyMove$, } from './sinks';

const die = (enemy) => {
  stage.removeChild(enemy);
  enemy.subscription.unsubscribe();
};

const enemyMove = (enemy: Enemy) => {
  const nextStep = steps[enemy.step];
  if (!nextStep) {
    enemyPassAllPaths$.next();
    enemy.die();
  } else {
    const newDirections = getMove(enemy, nextStep, enemy.speed);
    enemy.x = newDirections.x;
    enemy.y = newDirections.y;
    if (getDistance(enemy.x, enemy.y, nextStep.x, nextStep.y) < enemy.speed) {
      enemy.step++;
    }
    enemyMove$.next(enemy);
  }
};

export function enemyFactory() {
  const enemy: Enemy = new createjs.Shape();
  enemy.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
  enemy.step = 0;
  enemy.speed = settings.speed;
  enemy.die = function() {
    die(enemy);
  };

  enemy.subscription = ticker$.subscribe(() => {
      enemyMove(enemy);
    }
  );

  stage.addChild(enemy);
  return enemy;
}