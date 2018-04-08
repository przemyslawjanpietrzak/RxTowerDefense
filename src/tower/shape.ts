import { Shape } from 'easeljs/lib/easeljs';

import { tower as settings } from '../settings';

// import { getArea } from './area';
import { TowerShape } from './models';

export const showTowerShape = (x: number, y: number): TowerShape => {
    const towerShape: TowerShape = new Shape();
    // towerShape.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
    // towerShape.x = x;
    // towerShape.y = y;
    // towerShape.range = settings.range;
    // towerShape.areaVisible = true;
    // towerShape.area = getArea(towerShape);

    return towerShape;
};

export const hideTowerShape = (towerShape: TowerShape) => {

};
