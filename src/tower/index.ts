import effects from './effects';

export const runTower = (sinks) => {
	Object.keys(effects).forEach((key) => {
		effects[key](sinks);
	});
};
