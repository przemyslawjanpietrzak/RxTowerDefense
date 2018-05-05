import { expect } from 'chai';

import { getDistance, getMove, isInDistance } from '../utils';

describe('utils - ', () => {

  it('getDistance', () => {
    expect(getDistance(0, 0, 0, 0)).to.equal(0);
    expect(getDistance(0, 42, 0, 42)).to.equal(0);
    expect(getDistance(42, 0, 42, 0)).to.equal(0);
    expect(getDistance(42, 42, 42, 42)).to.equal(0);

    expect(getDistance(1, 1, 0, 0)).to.equal(1.4142135623730951);
    expect(getDistance(0, 0, 1, 1)).to.equal(1.4142135623730951);
  });

  it('getMove', () => {
    expect(
      getMove({ x: 0, z: 0 }, {x: 10, z: 0}, 1)
    ).to.deep.equal({ x: 1, z: 0 });
    expect(
      getMove({ x: 0, z: 0 }, {x: 10, z: 10}, 1)
    ).to.deep.equal({ x: 0.7071067811865476, z: 0.7071067811865475 });
  });

  it('isInDistance', () => {
    const towerMock = { position: { x: 1, z: 1 },  range: 1 };
    const towerMock1 = { position: { x: 1, z: 1 }, range: 2 };
    expect(
      isInDistance(towerMock as any, { x: 0, y: 0, z: 0})
    ).to.equal(false);
    expect(
      isInDistance(towerMock1 as any, { x: 0, y: 0, z: 0})
    ).to.equal(true)
  });

});