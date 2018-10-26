import { Observable, Subject } from 'rxjs';

export interface Subscription {
  unsubscribe: () => void;
}

export interface StagePosition {
  x: number;
  z: number;
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

export type Ticker$ = Observable<number>;

export interface Sinks {
  newTower$: Subject<Point>;
  changeWalletState$: Subject<number>;
  addTowerButtonClick$: Observable<any>;
  towerFireToEnemy$: Subject<any>;
  bulletHitEnemy$: Subject<any>;
  enemyCreate$: Subject<any>;
  sceneClick$: Subject<Point>;
  bulletMove$: Subject<any>;
  confirmTowerButtonClick$: Observable<any>;
  cancelTowerButtonClick$: Observable<any>;
  ticker$: Observable<number>;
  enemyPassAllPaths$: Subject<any>;
  playPauseButtonClick$: Observable<void>;
}
