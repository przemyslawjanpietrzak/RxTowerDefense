import { moneyOnBegin, livesOnBegin } from '../settings';

import drivers from './drivers';
import effects from './effects';


document.getElementById('money-count').innerHTML = String(moneyOnBegin);
document.getElementById('lives-count').innerHTML = String(livesOnBegin);


export function runMenu(sinks) {
    Object.keys(drivers).forEach((key) => {
        drivers[key](sinks);
    });
    Object.keys(effects).forEach((key) => {
        effects[key](sinks);
    });
}


