import { fromEvent } from 'rxjs';

export const addTowerButtonClick$ = fromEvent(document.getElementById('add'), 'click');
export const cancelTowerButtonClick$ = fromEvent(document.getElementById('cancel'), 'click');
export const confirmTowerButtonClick$ = fromEvent(document.getElementById('confirm'), 'click');
export const playPauseButtonClick$ = fromEvent(document.getElementById('play-pause'), 'click');
