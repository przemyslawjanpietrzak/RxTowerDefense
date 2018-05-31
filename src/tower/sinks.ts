import { Subject } from 'rxjs';

import { NewTower$, TowerFireToEnemy$ } from './models';

export const newTower$: NewTower$ = new Subject();
export const towerFireToEnemy$: TowerFireToEnemy$  = new Subject();
