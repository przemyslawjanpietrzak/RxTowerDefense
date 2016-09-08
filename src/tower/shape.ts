import createjs from 'easel';

import stage, { stageClick$, } from '../stage/stage';
import { getArea, } from './area';
import { tower as settings } from '../settings';


export const showTowerShape = (x: number, y: number): TowerShape => {
	const towerShape: TowerShape = new createjs.Shape();
	towerShape.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
	towerShape.x = x;
	towerShape.y = y;
	towerShape.range = settings.range;
	towerShape.areaVisible = true;
	towerShape.area = getArea(towerShape, true);

	stage.addChild(towerShape);
	stage.addChild(towerShape.area);
	return towerShape;
};

export const hideTowerShape = (towerShape: TowerShape) => {
	stage.removeChild(towerShape);
	stage.removeChild(towerShape.area);
};
