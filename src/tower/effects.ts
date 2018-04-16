import { Observable } from 'rxjs/Rx';

import { INITIAL_WALLET_STATE } from '../menu/settings';

import { Event } from '../common/models';
import { AddTowerButtonClick$, CancelTowerButtonClick$, ConfirmTowerButtonClick$ } from '../menu/models';

import { SceneClick$ } from '../scene/models';
import { scene } from '../scene/scene';

import { hideTowerArea, towerAreaFactory } from './area';
import { NewTower$, TowerShape } from './models';
import { TOWER_COST } from './settings';
import { hideTowerShape, showTowerShape } from './shape';
import { towerFactory } from './towers';

let towerPropose: TowerShape | null = null;
let towerArea = null;
let showTowerPropose: boolean = false;
let money: number = INITIAL_WALLET_STATE;

export const effects = {
    addTowerButtonClick: ({ addTowerButtonClick$ }: { addTowerButtonClick$: AddTowerButtonClick$ }) => {
        addTowerButtonClick$
            .filter(() => money >= TOWER_COST)
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

                if (towerArea) {
                    hideTowerArea(towerArea, scene);
                }
                towerArea = towerAreaFactory({ x, y: 0, z }, scene);

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
                    towerArea = hideTowerArea(towerArea, scene);
                }
            });
    },
    newTower: ({ newTower$ }: { newTower$: NewTower$ }) => {
        newTower$
            .subscribe(({ x, z }) => {
                hideTowerShape(towerPropose);
                towerArea = hideTowerArea(towerArea, scene);
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
                newTower$.next(towerPropose.position);
            });
    },
    changeWalletState: ({ changeWalletState$ }: { changeWalletState$: Observable<number> }) => {
        changeWalletState$.subscribe((newMoney: number) => {
            money = newMoney;
        });
    },
};
