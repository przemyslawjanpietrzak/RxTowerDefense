import * as createjs from 'easeljs/lib/easeljs';

import { tower as settings } from '../settings';
import stage from '../stage/stage';

export function getArea(tower: Tower | TowerShape) {
	const area: Shape = new createjs.Shape();
	area.graphics.beginFill(settings.areaColor).drawCircle(tower.x, tower.y, tower.range);

	return area;
}

export function toogleAreaFactory(tower: Tower | TowerShape) {
	return (event) => {
		const areaWasVisible = tower.areaVisible;
		if (areaWasVisible) {
			stage.removeChild(tower.area);
		} else {
			stage.addChild(tower.area);
		}
		tower.areaVisible = !areaWasVisible;
	};
}
export function hideTowerArea(tower: Tower | TowerShape) {
	tower.areaVisible = false;
	stage.removeChild(tower.area);
}
