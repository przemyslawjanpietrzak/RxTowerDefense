import { Observable } from 'rxjs/Rx';

import { moneyOnBegin, tower as towerSettings } from '../settings';

import { hideTowerShape, showTowerShape } from './shape';
import { towerFactory } from './towers';

let towerPropose = null;
let showTowerPropose: boolean = false;
let money = moneyOnBegin;

export default {
	addTowerButtonClick$: ({ addTowerButtonClick$ }) => {
		addTowerButtonClick$
			.filter(() => money >= towerSettings.cost)
			.subscribe(() => {
				showTowerPropose = true;
			});
	},
	stageClick$: ({ stageClick$ }) => {
		stageClick$
			.filter(() => showTowerPropose)
			.subscribe((event: Event) => {
				if (towerPropose) {
					hideTowerShape(towerPropose);
				}
				towerPropose = showTowerShape(event.stageX, event.stageY);
				showTowerPropose = true;
			});
	},
	cancelTowerButtonClick$: ({ cancelTowerButtonClick$ }: { cancelTowerButtonClick$: Observable<{}> }) => {
		cancelTowerButtonClick$
			.filter(() => towerPropose)
			.subscribe(() => {
				showTowerPropose = false;
				if (towerPropose) {
					hideTowerShape(towerPropose);
					towerPropose = null;
				}
			});
	},
	newTower$: ({ newTower$ }: { newTower$: Observable<Tower> }) => {
		newTower$
			.subscribe(() => {
				hideTowerShape(towerPropose);
				towerFactory(towerPropose.x, towerPropose.y);
				showTowerPropose = false;
			});
	},
	confirmTowerButtonClick$: ({ confirmTowerButtonClick$, newTower$ }) => {
		confirmTowerButtonClick$
			.filter(() => towerPropose && showTowerPropose)
			.subscribe((value) => {
				newTower$.next(value);
			});

	},
	changeWalletState$: ({ changeWalletState$ }: { changeWalletState$: Observable<number> }) => {
		changeWalletState$.subscribe((newMoney: number) => {
			money = newMoney;
		});
	},
};
