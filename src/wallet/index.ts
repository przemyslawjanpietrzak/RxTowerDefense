import { runEffects } from '../common/utils';

import effects from './effects';

export const runWallet = runEffects(effects);
