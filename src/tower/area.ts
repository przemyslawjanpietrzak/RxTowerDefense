import { CircleGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

import { Point } from '../common/models';

import { Tower } from './models';

export const towerAreaFactory = ({ x, y, z }: Point, scene: Scene): Mesh => {
    const geometry = new CircleGeometry(5, 32); // TODO settings
    const material = new MeshBasicMaterial({ color: 0xffff00 }); // TODO settings
    const circle: Mesh = new Mesh(geometry, material);
    circle.position.set(x, y, z);

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

export const hideTowerArea = (tower: Tower, scene: Scene) => {
    tower.areaVisible = false;
    scene.remove(tower.area);
};
