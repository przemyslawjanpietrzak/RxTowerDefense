import { Mesh, BoxGeometry, MeshPhongMaterial } from 'three';

import { tower as settings } from '../settings';

import { scene } from '../scene/scene';
// import { getArea } from './area';
import { TowerShape } from './models';
import { TOWER_COLOR } from './settings';

export const showTowerShape = (x: number, z: number): TowerShape => {
    // const towerShape: TowerShape = new Shape();
    // towerShape.graphics.beginFill(settings.color).drawCircle(0, 0, settings.size);
    // towerShape.x = x;
    // towerShape.y = y;
    // towerShape.range = settings.range;
    // towerShape.areaVisible = true;
    // towerShape.area = getArea(towerShape);

    const towerShape: TowerShape = new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshPhongMaterial({ color: TOWER_COLOR, wireframe: true })
    );
    towerShape.position.x = x;
    towerShape.position.y = 2;
    towerShape.position.z = z;

    scene.add(towerShape);

    return towerShape;
};

export const hideTowerShape = (towerShape: TowerShape) => {
    scene.remove(towerShape);
};
