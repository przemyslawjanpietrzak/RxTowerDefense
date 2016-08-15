import { prop } from 'ramda';

import { bulletHitEnemy$, die } from './bullet';

export default function bulletEngine() {
	bulletHitEnemy$.subscribe(die);
}
