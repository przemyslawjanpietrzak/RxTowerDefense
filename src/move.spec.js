/* global define, it, describe */
const assert = require('chai');
const map = require('./map');
const getStepChange = require('./enemy/move').getStepChange;
const getMove = require('./enemy/move').default;

describe('Get step change', function() {
  it('getStepChange should return true when distance between new point is smaller than speed', () => {
    assert.expect(
      getStepChange(100, 100, 120, 120, 25)
    ).to.equal(true);
  });

  it('getStepChange should return false when distance between new point is bigger than speed', () => {
    assert.expect(
      getStepChange(100, 100, 130, 130, 25)
    ).to.equal(false);
  });
});

describe('Get step change', () => {
  it('', () => {
    const exampleEnemy = {
      x: 275,
      y: 275,
      step: 2,
      speed: 25,
    };
    assert.expect(
      getMove(exampleEnemy)
    ).to.equal({ x: 300, y: 250, step: 2 });
  });

  it('', () => {
    const exampleEnemy = {
      x: 0,
      y: 0,
      step: 0,
      speed: 25,
    };
    assert.expect(
      getMove(exampleEnemy)
    ).to.equal({ x: 0, y: 25, step: 0 });
  });
});
