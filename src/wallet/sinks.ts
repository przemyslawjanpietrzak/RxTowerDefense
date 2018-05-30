import { Subject } from 'rxjs';

import { ChangeWalletState$ } from './models';

export const changeWalletState$: ChangeWalletState$ = new Subject();
