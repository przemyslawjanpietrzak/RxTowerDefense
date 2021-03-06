import { map } from 'rxjs/operators';

import { BulletHitEnemy$ } from '../bullet/models';
import { Enemy, EnemyCreate$, EnemyPassAllPaths$ } from '../enemy/models';

import { scene } from './scene';

export const effects = {
    enemyCreate: ({ enemyCreate$ }: { enemyCreate$: EnemyCreate$ }) => enemyCreate$.subscribe((enemy: Enemy) => {
        scene.add(enemy);
    }),
    bulletHitEnemy: ({ bulletHitEnemy$ }: { bulletHitEnemy$: BulletHitEnemy$ }) => bulletHitEnemy$
        .pipe(map(({ enemy }) => enemy))
        .subscribe((enemy: Enemy) => {
            scene.remove(enemy);
        }),
    enemyPassAllPaths: ({ enemyPassAllPaths$ }: { enemyPassAllPaths$: EnemyPassAllPaths$ }) => enemyPassAllPaths$.subscribe((enemy: Enemy) => {
        scene.remove(enemy);
    }),
};
