import { Observable, Subject } from 'rxjs/Rx';

export interface Subscription {
	unsubscribe: () => void;
}

export interface Graphics {
	beginFill (string): Graphics;
	beginStroke (string): Graphics;
	drawRect: (startX: number, startY: number, endX: number, endY: number) => void;
	drawCircle: (startX: number, startY: number, r: number) => void;
	moveTo: (x: number, y: number) => void;
	lineTo: (x: number, y: number) => void;
}

export interface Shape {
	graphics: Graphics;
	x: number;
	y: number;
}

export interface Stage {
	graphics: Graphics;
	addChild (Shape);
	removeChild (Shape);
	update (): void;
	addEventListener (string, Function): void;
}

export interface Createjs {
	Shape (): Shape;
	Stage (string): Stage;
}

export interface Sinks {
	[key: string]: Subject<any> | Observable<any>;
}

export interface Vector {
	x: number;
	y: number;
	angle (): number;
	length (): number;
}

export type Ticker$ = Subject<number>;
