import { Subject } from 'rxjs';
import { Mesh } from 'three';

import { Subscription } from '../common/models';

export interface EnemyActions {
    die: () => void;
    move: () => void;
}

export interface Enemy extends Mesh {
    dead: boolean;
    step: number;
    speed: number;
    die(): void;
    subscription: Subscription;
    actions: EnemyActions;
}

export type EnemyPassAllPaths$ = Subject<Enemy>;

export type EnemyMove$ = Subject<Enemy>;
export type EnemyCreate$ = Subject<Enemy>;
