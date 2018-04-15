import { CircleGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

import { Point } from '../common/models';

import { Tower } from './models';

export const getArea = ({ x, y, z }: Point): Mesh => {
    const geometry = new CircleGeometry(5, 32); // TODO settings
    const material = new MeshBasicMaterial({ color: 0xffff00 }); // TODO settings
    const circle: Mesh = new Mesh(geometry, material);
    circle.position.set(x, y, z);

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

export const hideTowerArea = (tower: Tower) => {
    tower.areaVisible = false;
    // stage.removeChild(tower.area);
};
