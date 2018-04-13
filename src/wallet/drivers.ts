import { Observable } from 'rxjs/Rx';
import { INITIAL_WALLET_STATE } from '../menu/settings';

import { BulletHitEnemy$ } from '../bullet/models';
import { NewTower$ } from '../tower/models';

let money = INITIAL_WALLET_STATE;
const drivers = {
    changeWalletState$: ({ newTower$, bulletHitEnemy$ }: { newTower$: NewTower$, bulletHitEnemy$: BulletHitEnemy$ }) => Observable.merge(
        bulletHitEnemy$.map(() => money += 50),
        newTower$.map(() => money -= 500),
    ),
};

export default drivers;
