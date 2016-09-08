import { towerFactory } from './towers';
import { showTowerShape, hideTowerShape } from './shape';

import { stageClick$ } from '../stage/stage';
import { addTowerButtonClick$, cancelTowerButtonClick$, confirmTowerButtonClick$ } from '../menu/sinks';
import wallet$ from '../wallet/index';

let towerPropose = null;
let showTowerPropose: boolean = false;
let money = 0;

wallet$.subscribe((newMoney) => {
	money = newMoney;
});


// Adding new tower from menu
addTowerButtonClick$
	.subscribe((event) => {
		showTowerPropose = true;
	});

stageClick$
	.filter(() => showTowerPropose)
	.subscribe(
		(event) => {
			if (towerPropose) {
				hideTowerShape(towerPropose);
			}
			towerPropose = showTowerShape(event.stageX, event.stageY);
			showTowerPropose = true;
		}
	);

cancelTowerButtonClick$
	.filter(() => towerPropose)
	.subscribe((event) => {
		showTowerPropose = false;
		if (towerPropose) {
			hideTowerShape(towerPropose);
			towerPropose = null;
		}
	});

export const newTower$ = confirmTowerButtonClick$.filter(() => towerPropose && showTowerPropose);

newTower$
	.subscribe((event) => {
		hideTowerShape(towerPropose);
		towerFactory(towerPropose.x, towerPropose.y);
		showTowerPropose = false;
	});
