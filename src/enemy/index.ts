import { bulletHitEnemy$ } from '../bullet/sinks';
import { prop } from '../utils';

import { Enemy } from './models';

bulletHitEnemy$
	.map(prop('enemy'))
	.subscribe((enemy: Enemy) => {
		enemy.die();
	});
