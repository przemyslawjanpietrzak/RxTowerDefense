import { Observable } from 'rxjs';

import { BulletHitEnemy$ } from '../bullet/models';
import { Ticker$ } from '../common/models';
import { TowerFireToEnemy$ } from '../tower/models';

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
			.filter(() => bulletToDie)
			.subscribe(() => {
				bulletToDie.die();
				bulletToDie = null;
		});
	},
};
