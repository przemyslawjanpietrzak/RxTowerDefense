
import { Subject } from 'rxjs/Rx';
import { Mesh } from 'three';

import { Graphics, Point, Subscription } from '../common/models';

import { Enemy } from '../enemy/models';

export interface Tower extends Mesh {
    range: number;
    reloadBulletTime: number;
    graphics: Graphics;
    stageClickSubscription:  Subscription;
    tickerSubscription:  Subscription;
    enemiesInRange: Array<Enemy>;
    enemySubscription:  Subscription;
    areaVisible: boolean;
    area: Mesh;
    fireToEnemy(Enemy): void;
    onClickHandler(Tower): void;
    addEventListener(string, Function): void;
    removeEventListener(string): void;
}

export interface TowerShape extends Mesh {
    range: number;
    graphics: Graphics;
    areaVisible: boolean;
    area: Mesh;
}

export type TowerArea = Mesh;

export type TowerFireToEnemy$ = Subject<{tower: Tower, enemy: Enemy }>;

export type NewTower$ = Subject<Point>;
