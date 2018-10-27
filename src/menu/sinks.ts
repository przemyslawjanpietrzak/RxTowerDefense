import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const addTowerButtonClick$ = fromEvent(document.getElementById('add') as HTMLElement, 'click');
export const cancelTowerButtonClick$ = fromEvent(document.getElementById('cancel') as HTMLElement, 'click');
export const confirmTowerButtonClick$ = fromEvent(document.getElementById('confirm') as HTMLElement, 'click');
export const playPauseButtonClick$: Observable<void> = fromEvent(document.getElementById('play-pause') as HTMLElement, 'click').pipe(
  map(() => undefined),
);
