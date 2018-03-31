import { Sinks } from '../common/models';

import * as effects from './effects';

export const runBullet = (sinks: Sinks) => {
	Object.keys(effects).forEach((key: string) => {
		effects[key](sinks);
	});
};
