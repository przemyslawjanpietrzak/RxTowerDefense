import { Observable, Subject } from 'rxjs/Rx';

export interface Subscription {
    unsubscribe: () => void;
}

export interface Graphics {
    beginFill(string): Graphics;
    beginStroke(string): Graphics;
    drawRect: (startX: number, startY: number, endX: number, endY: number) => void;
    drawCircle: (startX: number, startY: number, r: number) => void;
    moveTo: (x: number, y: number) => void;
    lineTo: (x: number, y: number) => void;
}

export interface Sinks {
    [key: string]: Subject<any> | Observable<any>;
}

export interface Vector {
    x: number;
    y: number;
    angle(): number;
    length(): number;
}

export interface StagePosition {
    x: number;
    y?: number;
    z?: number;
}

export interface Point {
    x: number;
    y: number;
    z: number;
}

export interface Scenario {
    tickPerStep: number;
    parts: {
        [s: number]: { tickPerEnemy: number };
    };
}

export interface Event {
    stageX: number;
    stageY: number;
}

export type Ticker$ = Subject<number>;
