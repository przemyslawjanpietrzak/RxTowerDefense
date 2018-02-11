import { bulletHitEnemy$ } from '../bullet/sinks';
import { prop } from '../utils';

bulletHitEnemy$
	.map(prop('enemy'))
	.subscribe((enemy: Enemy) => {
		enemy.die();
	});
