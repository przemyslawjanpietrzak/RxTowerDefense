import { Sinks } from '../common/models';

import { effects } from './effects';

export const runScene = (sinks: Sinks) => {
    Object.keys(effects).forEach((key: string) => {
        effects[key](sinks);
    });
};
