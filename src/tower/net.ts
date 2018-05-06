import { FLOOR_SIZE } from '../scene/settings';

import { StagePosition } from '../common/models';
import { areInDistance } from '../common/utils';

import { MIN_TOWER_DISTANE } from './settings';

export class TowerNet {

    private towers: Array<StagePosition> = [];

    public addTower(position: StagePosition): void {
        this.towers.push(position);
    }

    public canAdd(position: StagePosition): boolean {
      return !this.findTowerInRange(position);
    }

    public findTowerInRange(position: StagePosition): StagePosition {
        return this.towers.find(({ x, z }) => areInDistance(x, position.x, MIN_TOWER_DISTANE) && areInDistance(z, position.z, MIN_TOWER_DISTANE))
    }

}