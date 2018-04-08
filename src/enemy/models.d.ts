import { Subject } from 'rxjs/Rx';

import { Graphics, Subscription } from '../common/models';

export interface EnemyActions {
    die: () => void;
    move: () => void;
}

export interface Enemy {
    position: {
        x: number;
        y: number;
        z: number;
    };
    dead: boolean;
    scale: any;
    graphics: Graphics;
    step: number;
    speed: number;
    die (): void;
    subscription: Subscription;
    actions: EnemyActions;
}

export type EnemyPassAllPaths$ = Subject<Enemy>;

export type EnemyMove$ = Subject<Enemy>;
export type EnemyCreate$ = Subject<Enemy>;
