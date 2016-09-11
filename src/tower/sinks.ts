import { Subject } from 'rxjs/Rx';

export const newTower$  = new Subject();
export const towerFireToEnemy$: Observable<{tower: Tower, enemy: Enemy, }> = new Subject();