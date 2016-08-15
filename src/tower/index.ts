import { towerFactory } from './towers';
import { showTowerShape, hideTowerShape } from './shape';

import { stageClick$ } from '../stage/stage';
import { addTowerButtonClick$, cancelTowerButtonClick$, confirmTowerButtonClick$ } from '../menu/menu';


export default function towerEngine() {
	let towerPropose = null;
	let showTowerPropose: boolean = false;
	// Adding new tower from menu
	addTowerButtonClick$.subscribe((event) => {
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
				showTowerPropose = false;
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


	confirmTowerButtonClick$
		.filter(() => towerPropose)
		.subscribe((event) => {
			hideTowerShape(towerPropose);
			towerFactory(towerPropose.x, towerPropose.y);
			showTowerPropose = false;
		});
} // end

