import { CircleGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

import { Point } from '../common/models';

import { Tower, TowerArea } from './models';
import { TOWER_COLOR } from './settings';

export const towerAreaFactory = ({ x, y, z }: Point, scene: Scene): Mesh => {
    const geometry = new CircleGeometry(5, 32); // TODO settings
    const material = new MeshBasicMaterial({ color: TOWER_COLOR, wireframe: true }); // TODO settings
    const circle: Mesh = new Mesh(geometry, material);
    circle.position.set(x, y + 0.2, z);
    circle.rotation.x = -Math.PI / 2;

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
