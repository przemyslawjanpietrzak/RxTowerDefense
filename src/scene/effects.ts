import { Enemy, EnemyCreate$ } from '../enemy/models';

import { scene } from './scene';

export const effects = {   
    enemyCreate: ({ enemyCreate$ }: { enemyCreate$: EnemyCreate$ }) => enemyCreate$.subscribe((enemy: Enemy) => {
        scene.add(enemy);
    }),
    x: ({ ticker$ }) => ticker$.subscribe(a => console.log(a))
};
