
import { getDistance } from './../utils';

import { Ticker$ } from '../common/models';
import { Enemy } from '../enemy/models';
import { Tower, TowerFireToEnemy$ } from '../tower/models';

import { bulletFactory } from './bullet';
import { Bullet, BulletMove$ } from './models';
import { bulletHitEnemy$ } from './sinks';

let bulletToDie: Bullet = null;

export const effects = {
    towerFireToEnemy: ({ towerFireToEnemy$ }: { towerFireToEnemy$: TowerFireToEnemy$ }) => {
        towerFireToEnemy$
            .subscribe(({ tower, enemy }: { tower: Tower, enemy: Enemy }) => {
                bulletFactory(tower, enemy);
            });
    },
    bulletHitEnemy: ({ bulletMove$ }: { bulletMove$: BulletMove$ }) => {
        bulletMove$
            .filter(
                (bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed,
            )
            .subscribe((bullet: Bullet) => {
                bulletHitEnemy$.next({ bullet, enemy: bullet.enemy });
                bulletToDie = bullet;
            });
    },
    ticker: ({ ticker$ }: { ticker$: Ticker$ }) => {
        ticker$
            .filter(() => bulletToDie !== null)
            .subscribe(() => {
                bulletToDie.die();
                bulletToDie = null;
        });
    },
};
