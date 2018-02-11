import { Observable, Subject } from 'rxjs/Rx';

export const newTower$  = new Subject();
export const towerFireToEnemy$: Subject<{tower: Tower, enemy: Enemy }> = new Subject();
