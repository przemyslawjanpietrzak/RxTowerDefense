import drivers from './drivers';
import effects from './effects';
import { bulletHitEnemy$ as bulletHitEnemyProxy$, bullets$ as bulletsProxy$ } from './sinks';


const proxies = {
	bulletHitEnemy$: bulletHitEnemyProxy$,
	bullets$: bulletsProxy$,
};


export function runBullet(sinks) {
	Object.keys(drivers).forEach((key) => {
		const source = drivers[key](sinks);
		source.subscribe((value) => {
			proxies[key].next(value);
		})
	});
	Object.keys(effects).forEach((key) => {
		effects[key](sinks);
	});
}

