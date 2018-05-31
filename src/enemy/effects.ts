import { filter, map } from 'rxjs/operators';

import { Ticker$ } from '../common/models';
import { getTickerPerEnemy } from '../common/utils';

import scenario from '../scenario';

import { BulletHitEnemy$ } from '../bullet/models';

import { enemyFactory } from './enemy';
import { Enemy } from './models';
import { enemyCreate$ } from './sinks';

export const effects = {
    bulletHitEnemy: ({ bulletHitEnemy$ }: { bulletHitEnemy$: BulletHitEnemy$ }) => {
        bulletHitEnemy$
            .pipe(
                map(({ enemy }) => enemy),
            ).subscribe((enemy: Enemy) => {
                enemy.die();
            });
    },
    enemyCreate: ({ ticker$ }: { ticker$: Ticker$ }) => {
        ticker$
            .pipe(filter((counter) => counter % getTickerPerEnemy(counter, scenario) === 0))
            .subscribe(() => {
                const enemy = enemyFactory();
                enemyCreate$.next(enemy);
            });
    },
};
