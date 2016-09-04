import { prop } from 'ramda';
import { bulletHitEnemy$ } from '../bullet/bullet';

export default function () {
	bulletHitEnemy$
		.map(prop('enemy'))
		.subscribe((enemy: Enemy) => {
			console.debug('bulletHitEnemy$ enemy', enemy);
			enemy.die();
		});
}