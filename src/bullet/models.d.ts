import { Observable, Subject } from 'rxjs';

import { Graphics, Subscription } from '../common/models';
import { Enemy} from '../enemy/models';
import { Tower } from '../tower/models';

export interface Bullet {
	x: number;
	y: number;
	destinationX: number;
	destinationY: number;
	graphics: Graphics;
	step: number;
	speed: number;
	subscription: Subscription;
	enemy: Enemy;
	die (): void;
}

export type TowerFireToEnemy$ = Observable<{tower: Tower, enemy: Enemy}>;

export type BulletHitEnemy$ = Subject<Bullet>;

export type BulletMove$ = Subject<Bullet>;
