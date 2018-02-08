import { expect } from 'chai';

import { getDistance } from '../utils';

describe('utils - ', () => {

  it('getDistance', () => {
        expect(getDistance(0, 0, 0, 0)).to.equal(0);
  });

});