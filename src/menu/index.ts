import { livesOnBegin, moneyOnBegin } from '../settings';

import { Sinks } from '../common/models';
import effects from './effects';

document.getElementById('money-count').innerHTML = String(moneyOnBegin);
document.getElementById('lives-count').innerHTML = String(livesOnBegin);

export const runMenu = (sinks: Sinks) => {
    Object.keys(effects).forEach((key) => {
        effects[key](sinks);
    });
};
