import { INITIAL_LIVES_COUNT, INITIAL_WALLET_STATE } from './settings';

import { Sinks } from '../common/models';
import effects from './effects';

document.getElementById('money-count').innerHTML = String(INITIAL_WALLET_STATE);
document.getElementById('lives-count').innerHTML = String(INITIAL_LIVES_COUNT);

export const runMenu = (sinks: Sinks) => {
    Object.keys(effects).forEach((key) => {
        effects[key](sinks);
    });
};
