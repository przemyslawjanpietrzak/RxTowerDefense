import Rx from 'rxjs/Rx';
import 'rxjs/add/operator/timeInterval';
import { playPauseButtonClick$ } from './menu/menu';

let isPlay: Boolean = true;
playPauseButtonClick$
	.subscribe(() => {
		isPlay = !isPlay;
	});


export default Rx.Observable
  .interval(17)
  .timeInterval()
	.filter(() => isPlay)
;