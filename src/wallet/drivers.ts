import { Observable } from 'rxjs/Rx';
import { enemy as enemySettings, moneyOnBegin, tower as towerSettings } from '../settings';

declare interface Sources {
	newTower$: Observable<Tower>;
	bulletHitEnemy$: Observable<Bullet>;
}

let money = moneyOnBegin;
const drivers = {
	changeWalletState$: ({ newTower$, bulletHitEnemy$ }: Sources) => Observable.merge(
		bulletHitEnemy$.map(() => money += enemySettings.price),
		newTower$.map(() => money -= towerSettings.cost),
	),
};

export default drivers;
