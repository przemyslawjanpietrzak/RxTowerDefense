import { Observable } from 'rxjs/Rx';

import { playPauseButtonClick$ } from './menu/sinks';

const MILLISECONDS_PER_TICK = 17;

let counter = 0;
let isPlay: boolean = true;
playPauseButtonClick$
    .subscribe(() => {
        isPlay = !isPlay;
    });

export default Observable
    .interval(MILLISECONDS_PER_TICK)
    .timeInterval()
    .filter(() => isPlay)
    .map(() => ++counter);
