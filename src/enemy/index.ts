import { prop } from 'ramda';
import { bulletHitEnemy$ } from '../bullet/bullet';


bulletHitEnemy$
	.map(prop('enemy'))
	.subscribe((enemy: Enemy) => {
		enemy.die();
	});
