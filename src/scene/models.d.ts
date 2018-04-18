import { Subject } from 'rxjs/Rx';

export type SceneClick$ = Subject<{ x: number, y: number, z: number }>;
