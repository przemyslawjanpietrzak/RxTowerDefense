import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const addTowerButtonClick$ = fromEvent(document.getElementById('add'), 'click');
export const cancelTowerButtonClick$ = fromEvent(document.getElementById('cancel'), 'click');
export const confirmTowerButtonClick$ = fromEvent(document.getElementById('confirm'), 'click');
export const playPauseButtonClick$: Observable<void> = fromEvent(document.getElementById('play-pause'), 'click').pipe(
  map(() => null),
);
