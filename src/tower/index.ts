import effects from './effects';

export function runTower(sinks) {
	Object.keys(effects).forEach((key) => {
		effects[key](sinks);
	});
}
