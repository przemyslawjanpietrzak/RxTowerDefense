// import { getTickerPerEnemy, prop } from '../utils';

// import { Ticker$ } from '../common/models';
// import scenario from '../scenario';

// import { BulletHitEnemy$ } from '../bullet/models';

// import { enemyFactory } from './enemy';
import { Enemy, EnemyCreate$ } from '../enemy/models';
// import { enemyCreate$ } from './sinks';

import { scene } from './scene';

export const effects = {   
    enemyCreate: ({ enemyCreate$ }: { enemyCreate$: EnemyCreate$ }) => enemyCreate$.subscribe((enemy: Enemy) => {
        scene.add(enemy);
    })
};
