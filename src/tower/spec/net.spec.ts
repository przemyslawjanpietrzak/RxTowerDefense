import { expect } from 'chai';

import { TowerNet } from '../net';
import { NumberKeyframeTrack } from 'three';

describe('tower net - ', () => {

    let net;

    beforeEach(() => {
        net = new TowerNet();
        net.addTower({ x: 1, z: 1 });
        net.addTower({ x: 15, z: 12 });
        net.addTower({ x: 22.3, z: 24.4 });
        net.addTower({ x: 32.5, z: 34.5 });
    })

    it('canAdd should return true when is no towers near', () => {
        expect(
            net.canAdd({ x: 6.1, z: 6.2 })
        ).to.equal(true);

        expect(
            net.canAdd({ x: 21.2, z: 18.1 })
        ).to.equal(true);

        expect(
            net.canAdd({ x: 26.4, z: 29.45 })
        ).to.equal(true);
    });

    it('canAdd should return false when towers is near', () => {
        expect(
            net.canAdd({ x: 1, z: 1 })
        ).to.equal(false);

        expect(
            net.canAdd({ x: 10.1, z: 7.1 })
        ).to.equal(false);

        expect(
            net.canAdd({ x: 35, z: 37 })
        ).to.equal(false);
    });
});
