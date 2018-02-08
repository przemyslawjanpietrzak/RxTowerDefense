import { getDistance } from "./../utils";

const drivers = {
		bulletHitEnemy$: ({ bulletMove$ }) => bulletMove$
				.filter(
						(bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed,
				),
};

export default drivers;
