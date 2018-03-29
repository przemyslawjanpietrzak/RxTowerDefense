
import { Sinks } from '../common/models';

import drivers from './drivers';
import { changeWalletState$ as changeWalletStateProxy$ } from './sinks';

export const runWallet = (sinks: Sinks) => {
	Object.keys(drivers).forEach((key: string) => {
		const source = drivers[key](sinks);
		source.subscribe((value) => {
			changeWalletStateProxy$.next(value);
		});
	});
};
