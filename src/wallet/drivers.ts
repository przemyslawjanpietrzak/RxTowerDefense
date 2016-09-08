
// import scenario from '../scenario';
//
// // import { newTower$ } from '../tower/index';
// import { bulletHitEnemy$ } from '../bullet/bullet';
//

//
//
// let money = scenario.moneyOnStart;
//
// // newTower$.subscribe(() => {
// //     money -= newTower$.cost;
// // });
//
// bulletHitEnemy$.subscribe(() => {
//     money += enemySettings.price;
// });
//
// export default Observable.merge(bulletHitEnemy$).map(() => money);


import { Observable } from 'rxjs/Rx';
import { tower as towerSettings, enemy as enemySettings, } from '../settings';

let money = 0;
const drivers = {
    changeWalletState: ({ newTower$, bulletHitEnemy$ }) => Observable.merge(
        bulletHitEnemy$.map(() => money += enemySettings.price),
        newTower$.map(() => money -= towerSettings.cost)
    ),
};

export default drivers;