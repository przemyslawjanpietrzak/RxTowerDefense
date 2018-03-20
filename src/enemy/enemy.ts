import * as createjs from 'easeljs/lib/easeljs';

import steps from '../mapPoint';
import { enemy as settings } from '../settings';
import { stage } from '../stage/stage';
import ticker$ from '../ticker';
import { getDistance, getMove } from '../utils';

import { enemyMove$, enemyPassAllPaths$ } from './sinks';

const die = (enemy: Enemy) => {
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

export const enemyFactory = () => {
	const enemy: Enemy = new createjs.Shape();
	enemy.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
	enemy.step = 0;
	enemy.speed = settings.speed;
	enemy.die = () => {
		die(enemy);
	};

	enemy.subscription = ticker$.subscribe(() => {
		enemyMove(enemy);
	});

	stage.addChild(enemy);
	return enemy;
};
