import createjs from "easel";

import stage from "../stage";


export function getArea(tower: Tower) {
	const area: Shape = new createjs.Shape();
	area.graphics.beginFill('rgba(255,0,0,0.5)').drawCircle(tower.x, tower.y, tower.range);

	return area;
}

export function toogleAreaFactory(tower: Tower) {
	return (event) => {
		const areaWasVisible = tower.areaVisible;
		if (areaWasVisible) {
			stage.removeChild(tower.area);
		} else {
			stage.addChild(tower.area);
		}
		tower.areaVisible = !areaWasVisible
	};
}