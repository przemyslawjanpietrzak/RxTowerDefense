import * as effects from './effects';

import { Sinks } from '../common/models';

export const runTower = (sinks: Sinks) => {
	Object.keys(effects).forEach((key: string) => {
		effects[key](sinks);
	});
};
