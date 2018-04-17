import { CircleGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

import { RIGHT_ANGLE } from '../common/constants';
import { Point } from '../common/models';

import { Tower, TowerArea } from './models';
import { TOWER_AREA_RADIUS, TOWER_AREA_SEGMENTS, TOWER_AREA_Y, TOWER_COLOR } from './settings';

export const towerAreaFactory = ({ x, y, z }: Point, scene: Scene): Mesh => {
    const geometry = new CircleGeometry(TOWER_AREA_RADIUS, TOWER_AREA_SEGMENTS);
    const material = new MeshBasicMaterial({ color: TOWER_COLOR, wireframe: true });
    const circle: Mesh = new Mesh(geometry, material);
    circle.position.set(x, y + TOWER_AREA_Y, z);
    circle.rotation.x = -RIGHT_ANGLE;

    scene.add(circle);

    return circle;
};

export const toggleAreaFactory = (tower: Tower, scene: Scene) => {
    return () => {
        const areaWasVisible = tower.areaVisible;
        if (areaWasVisible) {
            scene.remove(tower.area);
        } else {
            scene.add(tower.area);
        }
        tower.areaVisible = !areaWasVisible;
    };
};

export const hideTowerArea = (towerArea: TowerArea, scene: Scene): null => {
    scene.remove(towerArea);

    return null;
};
