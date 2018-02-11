import { Observable } from 'rxjs';

import { bulletFactory } from './bullet';

let bulletToDie: Bullet = null;

export default {
	towerFireToEnemy$: ({ towerFireToEnemy$ }: { towerFireToEnemy$: Observable<{tower: Tower, enemy: Enemy}>}) => {
		towerFireToEnemy$
			.subscribe(({ tower, enemy }) => {
				bulletFactory(tower, enemy);
			});
	},
	bulletHitEnemy$: ({ bulletHitEnemy$ }: { bulletHitEnemy$: Observable<Bullet> }) => {
		bulletHitEnemy$.subscribe((bullet: Bullet) => {
			bulletToDie = bullet;
		});
	},
	ticker$: ({ ticker$ }) => {
		ticker$
			.filter(() => bulletToDie)
			.subscribe(() => {
				bulletToDie.die();
				bulletToDie = null;
		});
	},
};
