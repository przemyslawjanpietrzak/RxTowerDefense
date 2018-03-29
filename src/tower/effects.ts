import { Observable } from 'rxjs/Rx';

import { moneyOnBegin, tower as towerSettings } from '../settings';

import { hideTowerShape, showTowerShape } from './shape';
import { towerFactory } from './towers';

let towerPropose = null;
let showTowerPropose: boolean = false;
let money = moneyOnBegin;

export const addTowerButtonClickEffect$ = ({ addTowerButtonClick$ }) => {
	addTowerButtonClick$
		.filter(() => money >= towerSettings.cost)
		.subscribe(() => {
			showTowerPropose = true;
		});
};

export const stageClickEffect$ = ({ stageClick$ }) => {
	stageClick$
		.filter(() => showTowerPropose)
		.subscribe((event: Event) => {
			if (towerPropose) {
				hideTowerShape(towerPropose);
			}
			towerPropose = showTowerShape(event.stageX, event.stageY);
			showTowerPropose = true;
		});
};

export const cancelTowerButtonClickEffect$ = ({ cancelTowerButtonClick$ }: { cancelTowerButtonClick$: Observable<void> }) => {
	cancelTowerButtonClick$
		.filter(() => towerPropose)
		.subscribe(() => {
			showTowerPropose = false;
			if (towerPropose) {
				hideTowerShape(towerPropose);
				towerPropose = null;
			}
		});
};

export const newTowerEffect$ = ({ newTower$ }: { newTower$: Observable<Tower> }) => {
	newTower$
		.subscribe(() => {
			hideTowerShape(towerPropose);
			towerFactory(towerPropose.x, towerPropose.y);
			showTowerPropose = false;
		});
};

export const confirmTowerButtonClickEffect$ = ({ confirmTowerButtonClick$, newTower$ }) => {
	confirmTowerButtonClick$
		.filter(() => towerPropose && showTowerPropose)
		.subscribe((value) => {
			newTower$.next(value);
		});
};

export const changeWalletStateEffect$ = ({ changeWalletState$ }: { changeWalletState$: Observable<number> }) => {
	changeWalletState$.subscribe((newMoney: number) => {
		money = newMoney;
	});
};
