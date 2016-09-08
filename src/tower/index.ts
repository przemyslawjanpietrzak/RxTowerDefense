

import { stageClick$ } from '../stage/stage';
import { addTowerButtonClick$, cancelTowerButtonClick$, confirmTowerButtonClick$ } from '../menu/sinks';
import wallet$ from '../wallet/index';

import { towerFactory } from './towers';
import { showTowerShape, hideTowerShape } from './shape';
import { newTower$ as newTowerProxy$ } from './sinks';

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
	.subscribe((event) => {
		if (towerPropose) {
			hideTowerShape(towerPropose);
		}
		towerPropose = showTowerShape(event.stageX, event.stageY);
		showTowerPropose = true;
	});

cancelTowerButtonClick$
	.filter(() => towerPropose)
	.subscribe((event) => {
		showTowerPropose = false;
		if (towerPropose) {
			hideTowerShape(towerPropose);
			towerPropose = null;
		}
	});

confirmTowerButtonClick$
	.filter(() => towerPropose && showTowerPropose)
	.subscribe((value) => {
		newTowerProxy$.next(value);
	});


newTowerProxy$
	.subscribe((event) => {
		hideTowerShape(towerPropose);
		towerFactory(towerPropose.x, towerPropose.y);
		showTowerPropose = false;
	});
