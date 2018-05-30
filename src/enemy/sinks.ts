import { Subject } from 'rxjs';

import { EnemyCreate$, EnemyMove$, EnemyPassAllPaths$ } from './models';

export const enemyPassAllPaths$: EnemyPassAllPaths$ = new Subject();
export const enemyMove$: EnemyMove$ = new Subject();
export const enemyCreate$: EnemyCreate$ = new Subject();
