import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import { scene } from '../scene/scene';

import { TowerShape } from './models';
import { TOWER_COLOR, TOWER_SIZE, TOWER_Y } from './settings';

export const showTowerShape = (x: number, z: number): TowerShape => {
    const towerShape = new Mesh(
        new BoxGeometry(TOWER_SIZE, TOWER_SIZE, TOWER_SIZE),
        new MeshPhongMaterial({ color: TOWER_COLOR, wireframe: true }),
    ) as TowerShape;
    towerShape.position.x = x;
    towerShape.position.y = TOWER_Y;
    towerShape.position.z = z;

    scene.add(towerShape);

    return towerShape;
};

export const hideTowerShape = (towerShape: TowerShape) => {
    scene.remove(towerShape);
};
