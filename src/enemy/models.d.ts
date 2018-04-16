import { Subject } from 'rxjs/Rx';
import { Mesh } from 'three';

import { Graphics, Subscription } from '../common/models';

export interface EnemyActions {
    die: () => void;
    move: () => void;
}

export interface Enemy extends Mesh {
    dead: boolean;
    graphics: Graphics;
    step: number;
    speed: number;
    die(): void;
    subscription: Subscription;
    actions: EnemyActions;
}

export type EnemyPassAllPaths$ = Subject<Enemy>;

export type EnemyMove$ = Subject<Enemy>;
export type EnemyCreate$ = Subject<Enemy>;
