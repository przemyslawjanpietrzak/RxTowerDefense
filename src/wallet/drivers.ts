import { Observable } from 'rxjs/Rx';
import { enemy as enemySettings, moneyOnBegin, tower as towerSettings } from '../settings';

import { BulletHitEnemy$ } from '../bullet/models';
import { NewTower$ } from '../tower/models';

let money = moneyOnBegin;
const drivers = {
    changeWalletState$: ({ newTower$, bulletHitEnemy$ }: { newTower$: NewTower$, bulletHitEnemy$: BulletHitEnemy$ }) => Observable.merge(
        bulletHitEnemy$.map(() => money += enemySettings.price),
        newTower$.map(() => money -= towerSettings.cost),
    ),
};

export default drivers;
