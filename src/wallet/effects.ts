import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { INITIAL_WALLET_STATE } from '../menu/settings';

import { BulletHitEnemy$ } from '../bullet/models';
import { ENEMY_REWARD } from '../enemy/settings';
import { NewTower$ } from '../tower/models';
import { TOWER_COST } from '../tower/settings';

import { changeWalletState$ } from './sinks';

let walletState = INITIAL_WALLET_STATE;
const effects = {
    changeWalletState: ({ newTower$, bulletHitEnemy$ }: { newTower$: NewTower$, bulletHitEnemy$: BulletHitEnemy$ }) => merge(
        bulletHitEnemy$.pipe(map(() => ENEMY_REWARD)),
        newTower$.pipe(map(() => -TOWER_COST)),
    ).subscribe((walletUpdate: number) => {
        walletState += walletUpdate;
        changeWalletState$.next(walletState);
    }),
};

export default effects;
