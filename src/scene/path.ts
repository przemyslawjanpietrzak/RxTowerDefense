import * as createjs from 'easeljs/lib/easeljs';
import { LineBasicMaterial, Geometry, Vector3, Line } from 'three';

import { Shape } from '../common/models';

import steps from '../mapPoint';
import { scene } from './scene';

const material = new LineBasicMaterial({
    color: 0x906090,
    linewidth: 100,
});

const geometry = new Geometry();
geometry.vertices.push(
    new Vector3(0, 0, 0), // TODO
);
steps.forEach(({ x, y, z }) => {
    geometry.vertices.push(
        new Vector3(x, y, z), // TODO
    );
});

export const path = new Line( geometry, material );
