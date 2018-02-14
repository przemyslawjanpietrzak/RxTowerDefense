import { Subject } from 'rxjs/Rx';

export const bulletHitEnemy$: Subject<Bullet> = new Subject();
export const bulletMove$: Subject<Bullet> = new Subject();
