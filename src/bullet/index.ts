import { bulletHitEnemy$ } from './bullet';

export default function () {
	bulletHitEnemy$
		.subscribe((bullet: Bullet) => {
			window.setTimeout(() => { // TODO
				bullet.die();
			});
		});
}