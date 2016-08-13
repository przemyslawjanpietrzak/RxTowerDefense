import { towerFactory } from './towers';
import { showTowerShape, hideTowerShape } from './shape';

import { stageClick$ } from '../stage/stage';
import { addTowerButtonClick$, cancelTowerButtonClick$, confirmTowerButtonClick$ } from '../menu/menu';


export default function towerEngine() {
	let towerPropose = null;
	let showTowerPropose: boolean = false;

	addTowerButtonClick$.subscribe((event) => {
		window.setTimeout(() => {
			showTowerPropose = true;
		});
	});


	stageClick$
		.filter(() => showTowerPropose)
		.subscribe(
			(event) => {
				towerPropose = showTowerShape(event.stageX, event.stageY);
				showTowerPropose = false;
			}
		);

	cancelTowerButtonClick$.subscribe((event) => {
		showTowerPropose = false;
		if (towerPropose) {
			hideTowerShape(towerPropose);
		}
	});


	confirmTowerButtonClick$
		.filter(() => towerPropose)
		.subscribe((event) => {
			hideTowerShape(towerPropose);
			towerFactory(towerPropose.x, towerPropose.y);
			showTowerPropose = false;
		});
}