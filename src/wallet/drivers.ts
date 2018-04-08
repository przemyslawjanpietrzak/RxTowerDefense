import { Observable } from 'rxjs/Rx';
import { moneyOnBegin, } from '../settings';

import { BulletHitEnemy$ } from '../bullet/models';
import { NewTower$ } from '../tower/models';

let money = moneyOnBegin;
const drivers = {
    changeWalletState$: ({ newTower$, bulletHitEnemy$ }: { newTower$: NewTower$, bulletHitEnemy$: BulletHitEnemy$ }) => Observable.merge(
        bulletHitEnemy$.map(() => money += 50),
        newTower$.map(() => money -= 500),
    ),
};

export default drivers;
