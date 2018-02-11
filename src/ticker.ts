import { Observable } from 'rxjs/Rx';

import { playPauseButtonClick$ } from './menu/sinks';

let isPlay: boolean = true;
playPauseButtonClick$
	.subscribe(() => {
		isPlay = !isPlay;
	});

export default Observable
	.interval(17)
	.timeInterval()
	.filter(() => isPlay);
