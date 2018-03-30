
import { getDistance } from './../utils';

import { Bullet, BulletMove$ } from './models';

const drivers = {
	bulletHitEnemy$: ({ bulletMove$ }: { bulletMove$: BulletMove$ }) => bulletMove$
		.filter(
			(bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed,
		),
};

export default drivers;
