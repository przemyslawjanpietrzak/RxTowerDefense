
import { Sinks } from '../common/models';
import { runEffects } from '../common/utils';

import effects from './effects';
import { changeWalletState$ as changeWalletStateProxy$ } from './sinks';

export const runWallet = runEffects(effects);
