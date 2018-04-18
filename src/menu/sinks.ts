import { Observable } from 'rxjs/Rx';

export const addTowerButtonClick$ = Observable.fromEvent(document.getElementById('add'), 'click');
export const cancelTowerButtonClick$ = Observable.fromEvent(document.getElementById('cancel'), 'click');
export const confirmTowerButtonClick$ = Observable.fromEvent(document.getElementById('confirm'), 'click');
export const playPauseButtonClick$ = Observable.fromEvent(document.getElementById('play-pause'), 'click');
