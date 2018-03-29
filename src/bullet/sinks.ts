import { Subject } from 'rxjs/Rx';
import { BulletHitEnemy$, BulletMove$ } from './models';

export const bulletHitEnemy$: Subject<Bullet> = new Subject();
export const bulletMove$: BulletMove$ = new Subject();
