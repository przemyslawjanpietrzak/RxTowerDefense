import drivers from './drivers';
import { changeWalletState$ as changeWalletStateProxy$ } from './sinks';

export const runWallet = (sinks) => {
	Object.keys(drivers).forEach((key) => {
		const source = drivers[key](sinks);
		source.subscribe((value) => {
			changeWalletStateProxy$.next(value);
		});
	});
};
