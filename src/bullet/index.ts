import { bulletHitEnemy$ } from '../bullet/bullet';

export default function () {
	bulletHitEnemy$
		.subscribe((bullet: Bullet) => {
			bullet.die();
		});
}