import { Mesh, MeshPhongMaterial, SphereGeometry, } from 'three';

import { bullet as settings } from '../settings';
import ticker from './../ticker';
import { getMove } from './../utils';

import { Point } from '../common/models';
import { Enemy } from '../enemy/models';
import { Tower } from '../tower/models';
import { scene } from '../scene/scene'; 

import { Bullet } from './models';
import { bulletMove$ } from './sinks';

const die = (bullet: Bullet) => {
    bullet.subscription.unsubscribe();
    scene.remove(bullet);
};

export const bulletFactory = ({ x, y, z }: Point, enemy: Enemy): Bullet => {
    // const bullet: Bullet = new Shape();
    // const { x: positionX, y: positionY } = tower;
    const { x: destinationX, z: destinationZ } = enemy.position;

    const bullet: Bullet = new Mesh(
        new SphereGeometry(5, 32, 32),
        new MeshPhongMaterial( {color: 0xfff} )
    );
    bullet.scale.set(0.07, 0.07, 0.07);
    
    bullet.position.x = x;
    bullet.position.y = 0;
    bullet.position.z = z;
    bullet.destinationX = destinationX;
    bullet.destinationZ = destinationZ;
    bullet.speed = 1;
    bullet.enemy = enemy;
    bullet.die = () => die(bullet);

    bullet.subscription = ticker.subscribe(() => { // TODO move to file
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
