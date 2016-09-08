import { prop } from '../utils';
import { bulletHitEnemy$ } from '../bullet/sinks';


bulletHitEnemy$
	.map(prop('enemy'))
	.subscribe((enemy: Enemy) => {
		enemy.die();
	});
