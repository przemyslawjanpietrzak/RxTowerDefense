import { FLOOR_SIZE } from '../scene/settings';

import { StagePosition } from '../common/models';

import { MIN_TOWER_DISTANE } from './settings';

const areInDistance = (x1: number, x2: number): boolean => Math.abs(x1 - x2) <= MIN_TOWER_DISTANE;

export class TowerNet {

    private towers: Array<StagePosition> = [];

    public addTower(position: StagePosition): void {
        this.towers.push(position);
    }

    public canAdd(position: StagePosition): boolean {
      return !this.findTowerInRange(position);
    }

    public findTowerInRange(position: StagePosition): StagePosition | undefined {
        return this.towers.find(({ x, z }) => areInDistance(x, position.x) && areInDistance(z, position.z));
    }

}
