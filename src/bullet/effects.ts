
import { getDistance } from './../utils';

import { Ticker$ } from '../common/models';
import { Enemy } from '../enemy/models';
import { Tower, TowerFireToEnemy$ } from '../tower/models';

import { bulletFactory } from './bullet';
import { Bullet, BulletHitEnemy$ } from './models';

let bulletToDie: Bullet = null;

export const towerFireToEnemy = ({ towerFireToEnemy$ }: { towerFireToEnemy$: TowerFireToEnemy$ }) => {
	towerFireToEnemy$
		.subscribe(({ tower, enemy }: { tower: Tower, enemy: Enemy }) => {
			bulletFactory(tower, enemy);
		});
};

export const bulletHitEnemy = ({ bulletHitEnemy$ }: { bulletHitEnemy$: BulletHitEnemy$ }) => {
	bulletHitEnemy$
		.filter(
			(bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed,
		)
		.subscribe((bullet: Bullet) => {
			bulletToDie = bullet;
	});
};

export const ticker = ({ ticker$ }: { ticker$: Ticker$ }) => {
	ticker$
		.filter(() => bulletToDie !== null)
		.subscribe(() => {
			bulletToDie.die();
			bulletToDie = null;
	});
};
