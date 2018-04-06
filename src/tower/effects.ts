import { Observable } from 'rxjs/Rx';

import { moneyOnBegin, tower as towerSettings } from '../settings';

import { Event } from '../common/models';
import { AddTowerButtonClick$, CancelTowerButtonClick$, ConfirmTowerButtonClick$ } from '../menu/models';

import { SceneClick$ } from '../scene/models';

import { NewTower$ } from './models';
import { hideTowerShape, showTowerShape } from './shape';
import { towerFactory } from './towers';

let towerPropose = null;
let showTowerPropose: boolean = false;
let money = moneyOnBegin;

export const effects = {
    addTowerButtonClick: ({ addTowerButtonClick$ }: { addTowerButtonClick$: AddTowerButtonClick$ }) => {
        addTowerButtonClick$
            .filter(() => money >= towerSettings.cost)
            .subscribe(() => {
                showTowerPropose = true;
            });
    },
    sceneClick: ({ newTower$, sceneClick$ }: { newTower$: NewTower$, sceneClick$: SceneClick$ }) => {
        sceneClick$
            .filter(() => showTowerPropose)
            .subscribe(({ x, y, z }) => {
                newTower$.next({ x, y, z });
                // if (towerPropose) {
                //     hideTowerShape(towerPropose);
                // }
                // towerPropose = showTowerShape(event.stageX, event.stageY);
                // showTowerPropose = true;
            });
    },
    // cancelTowerButtonClick: ({ cancelTowerButtonClick$ }: { cancelTowerButtonClick$: CancelTowerButtonClick$ }) => {
    //     cancelTowerButtonClick$
    //         .filter(() => towerPropose)
    //         .subscribe(() => {
    //             showTowerPropose = false;
    //             if (towerPropose) {
    //                 hideTowerShape(towerPropose);
    //                 towerPropose = null;
    //             }
    //         });
    // },
    newTower: ({ newTower$ }: { newTower$: NewTower$ }) => {
        newTower$
            .subscribe(({ x, y, z }) => {
                // hideTowerShape(towerPropose);
                towerFactory(x, z);
                // showTowerPropose = false;
            });
    },
    // confirmTowerButtonClick: (
    //     { confirmTowerButtonClick$, newTower$ }: { confirmTowerButtonClick$: ConfirmTowerButtonClick$, newTower$: NewTower$ },
    // ) => {
    //     confirmTowerButtonClick$
    //         .filter(() => towerPropose && showTowerPropose)
    //         .subscribe(newTower$.next);
    // },
    changeWalletState: ({ changeWalletState$ }: { changeWalletState$: Observable<number> }) => {
        changeWalletState$.subscribe((newMoney: number) => {
            money = newMoney;
        });
    },
};
