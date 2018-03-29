import * as Victor from 'victor';

import { Scenario, StagePosition, Vector } from './common/models';
import { Tower } from './tower/models';

const SQUARE_EXPONENT = 2;

export const getDistance = (x1: number, y1: number, x2: number, y2: number): number =>
	Math.sqrt(Math.pow(x1 - x2, SQUARE_EXPONENT) + Math.pow(y1 - y2, SQUARE_EXPONENT));

export const getMove = (position: StagePosition, destination: StagePosition, speed: number): StagePosition => {

	const vector: Vector = new Victor(destination.x - position.x, destination.y - position.y);
	const angle = vector.angle();
	const newX = position.x + speed * Math.cos(angle);
	const newY = position.y + speed * Math.sin(angle);

	return {
		x: newX,
		y: newY,
	};
};

export const isInDistance = (tower: Tower, destination: { x: number, y: number }): boolean => {
	return getDistance(tower.x, tower.y, destination.x, destination.y) <= tower.range;
};

export const getTickerPerEnemy = (counter: number, scenario: Scenario): number => {
	const currentPart = String(Math.floor(counter / scenario.tickPerStep));

	return scenario.parts[currentPart].tickPerEnemy;
};

export const prop = (key: string) => (obj: object) => obj[key];
