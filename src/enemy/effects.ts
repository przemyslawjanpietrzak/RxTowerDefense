import { getTickerPerEnemy, prop } from '../utils';

import { Ticker$ } from '../common/models';
import scenario from '../scenario';

import { BulletHitEnemy$ } from '../bullet/models';

import { enemyFactory } from './enemy';
import { Enemy } from './models';
import { enemyCreate$ } from './sinks';

export const effects = {
    bulletHitEnemy: ({ bulletHitEnemy$ }: { bulletHitEnemy$: BulletHitEnemy$ }) => {
        bulletHitEnemy$
            .map(prop('enemy'))
            .subscribe((enemy: Enemy) => {
                enemy.die();
            });
    },
    enemyCreate: ({ ticker$ }: { ticker$: Ticker$ }) => {
        ticker$
        
            .filter((counter) => counter % getTickerPerEnemy(counter, scenario) === 0)
            .subscribe(() => {
                const enemy = enemyFactory();
                console.warn('create');
                enemyCreate$.next(enemy);
            });
    },
};
