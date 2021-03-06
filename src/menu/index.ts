import { INITIAL_LIVES_COUNT, INITIAL_WALLET_STATE } from './settings';

import { runEffects } from '../common/utils';

import effects from './effects';

(document.getElementById('money-count') as HTMLElement).innerHTML = String(INITIAL_WALLET_STATE);
(document.getElementById('lives-count') as HTMLElement).innerHTML = String(INITIAL_LIVES_COUNT);

export const runMenu = runEffects(effects);
