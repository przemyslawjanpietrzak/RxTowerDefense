import { Subject } from 'rxjs/Rx';

import { ChangeWalletState$ } from './models';

export const changeWalletState$: ChangeWalletState$ = new Subject();
