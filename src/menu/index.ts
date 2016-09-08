import drivers from './drivers';
import effects from './effects';


export function runMenu(sinks) {
    Object.keys(drivers).forEach((key) => {
        drivers[key](sinks);
    });
    Object.keys(effects).forEach((key) => {
        effects[key](sinks);
    });
}


