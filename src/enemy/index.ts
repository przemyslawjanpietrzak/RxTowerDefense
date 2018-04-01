import { Sinks } from '../common/models';

import { effects } from './effects';

export const runEnemy = (sinks: Sinks) => {
    Object.keys(effects).forEach((key: string) => {
        effects[key](sinks);
    });
};
