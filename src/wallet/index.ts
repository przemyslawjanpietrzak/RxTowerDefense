import { Subject } from 'rxjs/Rx';
const proxyWallet$  = new Subject();

import drivers from './drivers';

export function runWallet(sinks) {
    Object.keys(drivers).forEach((key) => {
        const source = drivers[key](sinks);
        source.subscribe((value) => {
            proxyWallet$.next(value);
        })
    })
}
export default proxyWallet$