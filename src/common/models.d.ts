import { Observable, Subject } from 'rxjs/Rx';

export interface Subscription {
    unsubscribe: () => void;
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
