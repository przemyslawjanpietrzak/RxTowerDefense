import { FLOOR_SIZE } from '../scene/settings';

import { Tower } from './models';
import { StagePosition } from '../common/models';

export class TowerNet {

    private towers: Array<StagePosition> = [];

    public addTower(position: StagePosition): void {
        this.towers.push(
            this.roundPosition(position)
        );
    }

    public canAdd(position: StagePosition): boolean {
        const { x, z } = this.roundPosition(position);

        return !this.towers.find(({ x: towerX, z: towerZ }) => towerX === x && towerZ === z);
    }

    private roundPosition({ x, z }: StagePosition): StagePosition {
        return {
            x: Math.round(x),
            z: Math.round(z),
        }
    }
}