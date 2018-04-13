import { Observable, Subject } from 'rxjs';
import { Mesh } from 'three';

import { Graphics, Subscription } from '../common/models';
import { Enemy} from '../enemy/models';
import { Tower } from '../tower/models';

export interface Bullet extends Mesh {
    scale: any;
    destinationX: number;
    destinationY: number;
    destinationZ: number;
    graphics: Graphics;
    step: number;
    speed: number;
    subscription: Subscription;
    enemy: Enemy;
    die(): void;
}

export type TowerFireToEnemy$ = Observable<{tower: Tower, enemy: Enemy}>;

export type BulletHitEnemy$ = Subject<{ bullet: Bullet, enemy: Enemy }>;

export type BulletMove$ = Subject<Bullet>;
