import { Observable } from 'rxjs/Rx';

import { playPauseButtonClick$ } from './menu/sinks';

const MILISECONDS_PER_TICK = 17;

let isPlay: boolean = true;
playPauseButtonClick$
	.subscribe(() => {
		isPlay = !isPlay;
	});

export default Observable
	.interval(MILISECONDS_PER_TICK)
	.timeInterval()
	.filter(() => isPlay);
