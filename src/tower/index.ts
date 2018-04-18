import { effects } from './effects';

import { Sinks } from '../common/models';
import { runEffects } from '../common/utils';

export const runTower = runEffects(effects);
