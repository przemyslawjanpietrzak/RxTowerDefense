import Rx from 'rxjs/Rx';


export const addTowerButtonClick$ = Rx.Observable.fromEvent(document.getElementById('add-tower'), 'click');
export const cancelTowerButtonClick$ = Rx.Observable.fromEvent(document.getElementById('cancel'), 'click');
export const confirmTowerButtonClick$ = Rx.Observable.fromEvent(document.getElementById('confirm'), 'click');