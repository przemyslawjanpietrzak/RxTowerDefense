import * as createjs from 'easeljs/lib/easeljsd';

import { bullet as settings } from '../settingsd';
import stage from './../stage/staged';
import ticker from './../tickerd';
import { getMove } from './../utilsd';

import { bulletMove$ } from './sinksd';

const die = (bullet: Bullet) => {
	stage.removeChild(bullet);
	bullet.subscription.unsubscribe();
};

export const bulletFactory = (tower: Tower, enemy: Enemy): Bullet => {
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
			bullet.speed,
		);
		bullet.x = newDirections.x;
		bullet.y = newDirections.y;

		bulletMove$.next(bullet);
	});

	stage.addChild(bullet);

	return bullet;
};
