import { expect } from 'chai';

import { TowerNet } from '../net';
import { NumberKeyframeTrack } from 'three';

describe('tower net - ', () => {

    let net;

    beforeEach(() => {
        net = new TowerNet();
        net.addTower({ x: 1, z: 1 });
        net.addTower({ x: 2, z: 2 });
        net.addTower({ x: 3.3, z: 3.2 });
        net.addTower({ x: 4.8, z: 4.6 });
    })

    it('canAdd should return true when is no towers near', () => {
        expect(
            net.canAdd({ x: 1, z: 2 })
        ).to.equal(true);

        expect(
            net.canAdd({ x: 4, z: 4 })
        ).to.equal(true);

        expect(
            net.canAdd({ x: 4.3, z: 4.1 })
        ).to.equal(true);
    });

    it('canAdd should return false when towers is near', () => {
        expect(
            net.canAdd({ x: 1, z: 1 })
        ).to.equal(false);

        expect(
            net.canAdd({ x: 2.3, z: 2.3 })
        ).to.equal(false);

        expect(
            net.canAdd({ x: 5.1, z: 5.2 })
        ).to.equal(false);
    });
});
