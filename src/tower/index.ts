import * as effects from './effects';

export const runTower = (sinks) => {
	Object.keys(effects).forEach((key: string) => {
		effects[key](sinks);
	});
};
