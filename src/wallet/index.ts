import { Subject } from 'rxjs/Rx';
const proxyStream$  = new Subject();

import drivers from './drivers';

export function runWallet(sinks) {
    Object.keys(drivers).forEach((key) => {
        const source = drivers[key](sinks);
        source.subscribe((value) => proxyStream$.next(value))
    })
}
export default proxyStream$