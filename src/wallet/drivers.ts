import { Observable } from 'rxjs/Rx';
import { tower as towerSettings, enemy as enemySettings, } from '../settings';

let money = 0;
const drivers = {
    changeWalletState$: ({ newTower$, bulletHitEnemy$ }) => Observable.merge(
        bulletHitEnemy$.map(() => money += enemySettings.price),
        newTower$.map(() => money -= towerSettings.cost)
    ),
};

export default drivers;