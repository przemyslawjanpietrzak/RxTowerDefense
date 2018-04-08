
import { Subject } from 'rxjs/Rx';

import { Graphics, Point, Shape, Subscription } from '../common/models';

import { Enemy } from '../enemy/models';

export interface Tower {
    position: {
        x: number;
        y: number;
        z: number;
    };
    range: number;
    reloadBulletTime: number;
    graphics: Graphics;
    stageClickSubscription:  Subscription;
    tickerSubscription:  Subscription;
    enemiesInRange: Array<Enemy>;
    enemySubscription:  Subscription;
    areaVisible: boolean;
    area: Shape;
    die (): void;
    fireToEnemy (Enemy): void;
    onClickHandler (Tower): void;
    addEventListener (string, Function): void;
    removeEventListener (string): void;
}

export interface TowerShape {
    x: number;
    y: number;
    range: number;
    graphics: Graphics;
    areaVisible: boolean;
    area: Shape;
}

export type TowerFireToEnemy$ = Subject<{tower: Tower, enemy: Enemy }>;

export type NewTower$ = Subject<Point>;
