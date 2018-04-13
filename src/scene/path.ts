import { Geometry, Line, LineBasicMaterial, Vector3 } from 'three';

import { Shape } from '../common/models';

import steps from '../mapPoint';
import { scene } from './scene';
import { PATH_COLOR, PATH_WIDTH } from './settings';

const material = new LineBasicMaterial({
    color: PATH_COLOR,
    linewidth: PATH_WIDTH,

});

const geometry = new Geometry();
steps.forEach(({ x, y, z }) => {
    geometry.vertices.push(
        new Vector3(x, y + 0.1, z),
    );
});

export const path = new Line( geometry, material );
