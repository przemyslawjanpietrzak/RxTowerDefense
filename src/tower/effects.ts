import { Observable } from 'rxjs/Rx';

import { moneyOnBegin, tower as towerSettings } from '../settings';

import { Event } from '../common/models';
import { AddTowerButtonClick$, CancelTowerButtonClick$, ConfirmTowerButtonClick$ } from '../menu/models';

import { SceneClick$ } from '../scene/models';

import { NewTower$, TowerShape } from './models';
import { hideTowerShape, showTowerShape } from './shape';
import { towerFactory } from './towers';

let towerPropose: TowerShape | null = null;
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
            .subscribe(({ x, z }) => {
                if (towerPropose) {
                    hideTowerShape(towerPropose);
                }
                towerPropose = showTowerShape(x, z);
                showTowerPropose = true;
            });
    },
    cancelTowerButtonClick: ({ cancelTowerButtonClick$ }: { cancelTowerButtonClick$: CancelTowerButtonClick$ }) => {
        cancelTowerButtonClick$
            .filter(() => !!towerPropose)
            .subscribe(() => {
                showTowerPropose = false;
                if (towerPropose) {
                    hideTowerShape(towerPropose);
                    towerPropose = null;
                }
            });
    },
    newTower: ({ newTower$ }: { newTower$: NewTower$ }) => {
        newTower$
            .subscribe(({ x, z }) => {
                hideTowerShape(towerPropose);
                towerFactory(x, z);
                showTowerPropose = false;
            });
    },
    confirmTowerButtonClick: (
        { confirmTowerButtonClick$, newTower$ }: { confirmTowerButtonClick$: ConfirmTowerButtonClick$, newTower$: NewTower$ },
    ) => {
        confirmTowerButtonClick$
            .filter(() =>  showTowerPropose)
            .filter(() => !!towerPropose)
            .subscribe(() => {
                newTower$.next(towerPropose.position)
            });
    },
    changeWalletState: ({ changeWalletState$ }: { changeWalletState$: Observable<number> }) => {
        changeWalletState$.subscribe((newMoney: number) => {
            money = newMoney;
        });
    },
};
