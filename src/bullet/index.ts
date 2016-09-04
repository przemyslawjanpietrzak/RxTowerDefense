import { bulletHitEnemy$ } from './bullet';

export default function () {
	bulletHitEnemy$
		.subscribe((bullet: Bullet) => {
			window.setTimeout(() => { // TODO
				console.debug('bulletHitEnemy$ bullet', bullet);
				bullet.die();
			});


		});
}