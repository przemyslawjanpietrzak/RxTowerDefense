import { Observable } from "rxjs/Rx";
import { enemy as enemySettings, moneyOnBegin, tower as towerSettings } from "../settings";

let money = moneyOnBegin;
const drivers = {
	changeWalletState$: ({ newTower$, bulletHitEnemy$ }) => Observable.merge(
		bulletHitEnemy$.map(() => money += enemySettings.price),
		newTower$.map(() => money -= towerSettings.cost),
	),
};

export default drivers;
