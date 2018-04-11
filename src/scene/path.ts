import * as createjs from 'easeljs/lib/easeljs';
import { LineBasicMaterial, Geometry, Vector3, Line } from 'three';

import { Shape } from '../common/models';

import steps from '../mapPoint';
import { scene } from './scene';

const material = new LineBasicMaterial({
    color: 0x906090,
    // linewidth: 5,
    linewidth: 2,

});

const geometry = new Geometry();
steps.forEach(({ x, y, z }) => {
    geometry.vertices.push(
        new Vector3(x, y+0.1, z),
    );
});

export const path = new Line( geometry, material );
