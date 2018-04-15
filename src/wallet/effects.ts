import { Observable } from 'rxjs/Rx';
import { INITIAL_WALLET_STATE } from '../menu/settings';

import { BulletHitEnemy$ } from '../bullet/models';
import { NewTower$ } from '../tower/models';

import { changeWalletState$ } from './sinks';

let walletState = INITIAL_WALLET_STATE;
const effects = {
    changeWalletState: ({ newTower$, bulletHitEnemy$ }: { newTower$: NewTower$, bulletHitEnemy$: BulletHitEnemy$ }) => Observable.merge(
        bulletHitEnemy$.map(() => 50),
        newTower$.map(() => -500),
    ).subscribe((walletUpdate: number) => {
        walletState += walletUpdate;
        changeWalletState$.next(walletState);
    }),
};

export default effects;
