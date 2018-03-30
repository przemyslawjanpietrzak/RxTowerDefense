
import { Bullet, BulletHitEnemy$ } from '../bullet/models';
import { Ticker$ } from '../common/models';
import { Enemy } from '../enemy/models';
import { Tower, TowerFireToEnemy$ } from '../tower/models';

import { bulletFactory } from './bullet';

let bulletToDie: Bullet = null;

export default {
	towerFireToEnemy$: ({ towerFireToEnemy$ }: { towerFireToEnemy$: TowerFireToEnemy$ }) => {
		towerFireToEnemy$
			.subscribe(({ tower, enemy }: { tower: Tower, enemy: Enemy }) => {
				bulletFactory(tower, enemy);
			});
	},
	bulletHitEnemy$: ({ bulletHitEnemy$ }: { bulletHitEnemy$: BulletHitEnemy$ }) => {
		bulletHitEnemy$.subscribe((bullet: Bullet) => {
			bulletToDie = bullet;
		});
	},
	ticker$: ({ ticker$ }: { ticker$: Ticker$ }) => {
		ticker$
			.filter(() => bulletToDie !== null)
			.subscribe(() => {
				bulletToDie.die();
				bulletToDie = null;
		});
	},
};
