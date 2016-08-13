import createjs from "easel";
import Rx from 'rxjs/Rx';

import stage from '../stage/stage';

const addButton: Shape = new createjs.Shape();
addButton.graphics.beginFill('orange').drawRect(0, 0, 35, 35);

const cancelButton: Shape = new createjs.Shape();
cancelButton.graphics.beginFill('red').drawRect(35, 0, 35, 35);

const confirmButton: Shape = new createjs.Shape();
confirmButton.graphics.beginFill('blue').drawRect(70, 0, 35, 35);

export default function drawMenu() {
	addButton.addEventListener('click', () => {console.log('asd');});
	stage.addChild(addButton);
	stage.addChild(cancelButton);
	stage.addChild(confirmButton);
}

export const addTowerButtonClick$ = Rx.Observable.fromEvent(addButton, 'click');
export const cancelTowerButtonClick$ = Rx.Observable.fromEvent(cancelButton, 'click');
export const confirmTowerButtonClick$ = Rx.Observable.fromEvent(confirmButton, 'click');