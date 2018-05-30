import { interval } from 'rxjs';
import { filter } from 'rxjs/operators';

import { playPauseButtonClick$ } from './menu/sinks';

const MILLISECONDS_PER_TICK = 17;

let isPlay: boolean = true;
playPauseButtonClick$
    .subscribe(() => {
        isPlay = !isPlay;
    });

export default interval(MILLISECONDS_PER_TICK)
    .pipe(filter(() => isPlay));
