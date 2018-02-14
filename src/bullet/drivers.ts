import { Subject } from 'rxjs/Subject';

import { getDistance } from './../utils';

const drivers = {
	bulletHitEnemy$: ({ bulletMove$ }: { bulletMove$: Subject<Bullet> }) => bulletMove$
		.filter(
			(bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed,
		),
};

export default drivers;
