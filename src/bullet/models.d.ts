import { Observable, Subject } from 'rxjs';

import { Graphics, Subscription } from '../common/models';
import { Enemy} from '../enemy/models';
import { Tower } from '../tower/models';

export interface Bullet {
    position: {
        x: number;
        y: number;
        z: number;
    }
    scale: any;
    destinationX: number;
    destinationY: number;
    destinationZ: number;
    graphics: Graphics;
    step: number;
    speed: number;
    subscription: Subscription;
    enemy: Enemy;
    die (): void;
}

export type TowerFireToEnemy$ = Observable<{tower: Tower, enemy: Enemy}>;

export type BulletHitEnemy$ = Subject<{ bullet: Bullet, enemy: Enemy }>;

export type BulletMove$ = Subject<Bullet>;
