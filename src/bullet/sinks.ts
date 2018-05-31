import { Subject } from 'rxjs';
import { BulletHitEnemy$, BulletMove$ } from './models';

/* tslint:disable */
export const bulletHitEnemy$: BulletHitEnemy$ = new Subject();
export const bulletMove$: BulletMove$ = new Subject();
/* tslint:enable */
