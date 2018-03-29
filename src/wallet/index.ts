import { Observable, Subject } from 'rxjs/Rx';

import drivers from './drivers';
import { changeWalletState$ as changeWalletStateProxy$ } from './sinks';

declare interface Sinks {
	[key: string]: Subject<any> | Observable<any>;
}

export const runWallet = (sinks: Sinks) => {
	Object.keys(drivers).forEach((key: string) => {
		const source = drivers[key](sinks);
		source.subscribe((value) => {
			changeWalletStateProxy$.next(value);
		});
	});
};
