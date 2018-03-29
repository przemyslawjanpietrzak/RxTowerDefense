import { Subject } from 'rxjs/Rx';

import { Tower, TowerFireToEnemy$ } from './models';

export const newTower$: Subject<Tower> = new Subject();
export const towerFireToEnemy$: TowerFireToEnemy$  = new Subject();
