import { moneyOnBegin, tower as towerSettigns } from "../settings";

import { hideTowerShape, showTowerShape } from "./shape";
import { towerFactory } from "./towers";

let towerPropose = null;
let showTowerPropose: boolean = false;
let money = moneyOnBegin;

export default {
		addTowerButtonClick$: ({ addTowerButtonClick$ }) => {
			addTowerButtonClick$
				.filter(() => money >= towerSettigns.cost)
				.subscribe((event) => {
						showTowerPropose = true;
				});
	},
	stageClick$: ({ stageClick$ }) => {
		stageClick$
			.filter(() => showTowerPropose)
			.subscribe((event) => {
				if (towerPropose) {
						hideTowerShape(towerPropose);
				}
				towerPropose = showTowerShape(event.stageX, event.stageY);
				showTowerPropose = true;
			});
	},
	cancelTowerButtonClick$: ({ cancelTowerButtonClick$ }) => {
		cancelTowerButtonClick$
			.filter(() => towerPropose)
			.subscribe((event) => {
				showTowerPropose = false;
				if (towerPropose) {
					hideTowerShape(towerPropose);
					towerPropose = null;
					}
				});
	},
	newTower$: ({ newTower$ }) => {
		newTower$
			.subscribe((event) => {
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
	changeWalletState$: ({ changeWalletState$ }) => {
		changeWalletState$.subscribe((newMoney) => {
			money = newMoney;
		});
	},
};
