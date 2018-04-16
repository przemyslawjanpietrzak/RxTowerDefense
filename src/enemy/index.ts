import { Sinks } from '../common/models';
import { runEffects } from '../common/utils';

import { effects } from './effects';

export const runEnemy = runEffects(effects);
