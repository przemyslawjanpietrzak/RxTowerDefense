import { changeWalletState$ as changeWalletStateProxy$ } from './sinks';
import drivers from './drivers';


export function runWallet(sinks) {
    Object.keys(drivers).forEach((key) => {
        const source = drivers[key](sinks);
        source.subscribe((value) => {
            changeWalletStateProxy$.next(value);
        })
    })
}
