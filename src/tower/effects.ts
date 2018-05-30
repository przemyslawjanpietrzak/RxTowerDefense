import { Observable } from 'rxjs';

import { INITIAL_WALLET_STATE } from '../menu/settings';

import { AddTowerButtonClick$, CancelTowerButtonClick$, ConfirmTowerButtonClick$ } from '../menu/models';

import { SceneClick$ } from '../scene/models';
import { scene } from '../scene/scene';

import { hideTowerArea, towerAreaFactory } from './area';
import { NewTower$, TowerArea, TowerShape } from './models';
import { TowerNet } from './net';
import { TOWER_COST } from './settings';
import { hideTowerShape, showTowerShape } from './shape';
import { towerFactory } from './towers';

let towerPropose: TowerShape | null = null;
let towerArea: TowerArea | null = null;
let showTowerPropose: boolean = false;
let money: number = INITIAL_WALLET_STATE;

const towerNet = new TowerNet();

export const effects = {
    addTowerButtonClick: ({ addTowerButtonClick$ }: { addTowerButtonClick$: AddTowerButtonClick$ }) => {
        addTowerButtonClick$
            .filter(() => money >= TOWER_COST)
            .subscribe(() => {
                showTowerPropose = true;
            });
    },
    setTowerProposal: ({ newTower$, sceneClick$ }: { newTower$: NewTower$, sceneClick$: SceneClick$ }) => {
        sceneClick$
            .filter(() => showTowerPropose)
            .filter((position) => towerNet.canAdd(position))
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
    toggleTowerArea: ({ sceneClick$ }: { sceneClick$: SceneClick$ }) => {
        sceneClick$
            .map((position) => towerNet.findTowerInRange(position))
            .subscribe((position) => {
                if (towerArea && !showTowerPropose) {
                    towerArea = hideTowerArea(towerArea, scene);
                }
                if (position) {
                    hideTowerArea(towerArea, scene);
                    hideTowerShape(towerPropose);
                    towerArea = towerAreaFactory({ x: position.x, y: 0, z: position.z }, scene);
                }

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
                towerNet.addTower({ x, z });
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
