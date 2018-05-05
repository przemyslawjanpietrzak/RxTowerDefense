import { Geometry, Line, LineBasicMaterial, Vector3 } from 'three';

import steps from '../mapPoint';
import { PATH_COLOR, PATH_WIDTH } from './settings';

const material = new LineBasicMaterial({
    color: PATH_COLOR,
    linewidth: PATH_WIDTH,

});

const geometry = new Geometry();
steps.forEach(({ x, y, z }) => {
    geometry.vertices.push(
        new Vector3(x, y + 0.1, z), // TODO settings
    );
});

export const path = new Line( geometry, material );
