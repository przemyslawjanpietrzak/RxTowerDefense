import { Subject } from 'rxjs';
import { Mesh } from 'three';

import { Point, Subscription } from '../common/models';

import { Enemy } from '../enemy/models';
import { Tower } from '../tower/models';

export interface Tower extends Mesh {
    range: number;
    reloadBulletTime: number;
    stageClickSubscription: Subscription;
    tickerSubscription: Subscription;
    enemiesInRange: Array<Enemy>;
    enemySubscription: Subscription;
    areaVisible: boolean;
    area: Mesh;
    fireToEnemy(control: Enemy): void;
    onClickHandler(tower: Tower): void;
    addEventListener(eventName: string, cb: (event: Tower) => void): void;
    removeEventListener(eventName: string): void;
}

export type TowerShape = Mesh;

export type TowerArea = Mesh;

export type TowerFireToEnemy$ = Subject<{ tower: Tower, enemy: Enemy }>;

export type NewTower$ = Subject<Point>;
