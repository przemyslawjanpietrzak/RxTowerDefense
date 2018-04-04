import { Subject } from 'rxjs/Rx';

import { EnemyMove$, EnemyPassAllPaths$ } from './models';

export const enemyPassAllPaths$: EnemyPassAllPaths$ = new Subject();
export const enemyMove$: EnemyMove$ = new Subject();
export const enemyCreate$ = new Subject();
