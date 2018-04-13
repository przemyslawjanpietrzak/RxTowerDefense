
import { Sinks } from '../common/models';

import effects from './effects';
import { changeWalletState$ as changeWalletStateProxy$ } from './sinks';

export const runWallet = (sinks: Sinks) => {
    Object.keys(effects).forEach((key: string) => {
        effects[key](sinks);
    });
};
