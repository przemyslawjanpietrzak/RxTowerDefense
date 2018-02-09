import { bulletFactory } from "./bullet";

let bulletToDie: Bullet = null;

export default {
	towerFireToEnemy$: ({ towerFireToEnemy$ }) => {
		towerFireToEnemy$
			.subscribe(({ tower, enemy }) => {
				bulletFactory(tower, enemy);
			});
	},
	bulletHitEnemy$: ({ bulletHitEnemy$ }) => {
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
