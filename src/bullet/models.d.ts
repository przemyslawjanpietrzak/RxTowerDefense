import { Observable, Subject } from 'rxjs';
import { Mesh, Vector3 } from 'three';

import { Subscription } from '../common/models';
import { Enemy} from '../enemy/models';
import { Tower } from '../tower/models';

export interface Bullet extends Mesh {
    destinationX: number;
    destinationY: number;
    destinationZ: number;
    step: number;
    speed: number;
    subscription: Subscription;
    enemy: Enemy;
    die(): void;
}

export type TowerFireToEnemy$ = Observable<{tower: Tower, enemy: Enemy}>;

export type BulletHitEnemy$ = Subject<{ bullet: Bullet, enemy: Enemy }>;

export type BulletMove$ = Subject<Bullet>;
