import { Mesh, MeshPhongMaterial, SphereGeometry } from 'three';

import ticker from './../ticker';

import { Point } from '../common/models';
import { getMove } from '../common/utils';
import { Enemy } from '../enemy/models';
import { scene } from '../scene/scene';

import { Bullet } from './models';
import { BULLET_COLOR, BULLET_SCALE, BULLET_SPEED } from './settings';
import { bulletMove$ } from './sinks';

const die = (bullet: Bullet) => {
    bullet.subscription.unsubscribe();
    scene.remove(bullet);
};

export const bulletFactory = ({ x, z }: Point, enemy: Enemy): Bullet => {

    const { x: destinationX, z: destinationZ } = enemy.position;

    const bullet = new Mesh(
        new SphereGeometry(5, 32, 32),
        new MeshPhongMaterial({ color: BULLET_COLOR }),
    ) as Bullet;
    bullet.scale.set(BULLET_SCALE, BULLET_SCALE, BULLET_SCALE);

    bullet.position.x = x;
    bullet.position.y = 0;
    bullet.position.z = z;
    bullet.destinationX = destinationX;
    bullet.destinationZ = destinationZ;
    bullet.speed = BULLET_SPEED;
    bullet.enemy = enemy;
    bullet.die = () => die(bullet);

    bullet.subscription = ticker.subscribe(() => { // TODO move to file
        if (bullet.enemy.dead) {
            bullet.die();

            return;
        }
        const newDirections = getMove(
            bullet.position,
            { x: destinationX, z: destinationZ },
            bullet.speed,
        );

        bullet.position.x = newDirections.x;
        bullet.position.z = newDirections.z;

        bulletMove$.next(bullet);
    });

    scene.add(bullet);

    return bullet;
};
