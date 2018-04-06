import { Observable } from 'rxjs/Rx';

export const addTowerButtonClick$ = Observable.fromEvent(document.getElementById('body'), 'click');
export const cancelTowerButtonClick$ = Observable.fromEvent(document.getElementById('body'), 'click');
export const confirmTowerButtonClick$ = Observable.fromEvent(document.getElementById('body'), 'click');

export const playPauseButtonClick$ = Observable.fromEvent(document.getElementById('body'), 'click');
