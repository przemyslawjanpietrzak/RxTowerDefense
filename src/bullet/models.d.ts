import { Observable } from 'rxjs';


export interface Bullet {
	x: number;
	y: number;
	destinationX: number;
	destinationY: number;
	graphics: Graphics;
	step: number;
	speed: number;
	subscription: Subscription;
	enemy: Enemy;
	die (): void;
}

export type TowerFireToEnemy$ = Observable<{tower: Tower, enemy: Enemy}>
