import { expect } from 'chai';

import { getDistance, getMove, isInDistance, prop } from '../utils';

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
      getMove({ x: 0, y: 0 }, {x: 10, y: 0}, 1)
    ).to.deep.equal({ x: 1, y: 0 });
    expect(
      getMove({ x: 0, y: 0 }, {x: 10, y: 10}, 1)
    ).to.deep.equal({ x: 0.7071067811865476, y: 0.7071067811865475 });
  });

  it('prop', () => {
    expect(prop('key')({ key: 42})).to.equal(42);
    expect(prop('key1')({ key: 42})).to.equal(undefined);
  });

  it('isInDistance', () => {
    expect(
      isInDistance({x: 1, y: 1, range: 1} as any, { x: 0, y: 0})
    ).to.equal(false);
    expect(
      isInDistance({x: 1, y: 1, range: 2} as any, { x: 0, y: 0})
    ).to.equal(true)
  });

});