import { Observable, Subject } from 'rxjs/Rx';

import drivers from './drivers';
import effects from './effects';
import { bulletHitEnemy$ as bulletHitEnemyProxy$, bulletMove$ as bulletMoveProxy$ } from './sinks';

declare interface Sinks {
	[key: string]: Subject<any> | Observable<any>;
}

const proxies = {
	bulletHitEnemy$: bulletHitEnemyProxy$,
	bulletMove$: bulletMoveProxy$,
};

export const runBullet = (sinks: Sinks) => {
	Object.keys(drivers).forEach((key: string) => {
		const source = drivers[key](sinks);
		source.subscribe((value) => {
			proxies[key].next(value);
		});
	});
	Object.keys(effects).forEach((key: string) => {
		effects[key](sinks);
	});
};
