import { Subject } from 'rxjs/Rx';

import { SceneClick$ } from './models';

export const sceneClick$: SceneClick$ = new Subject();