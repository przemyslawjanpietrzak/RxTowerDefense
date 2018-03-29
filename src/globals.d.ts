
interface Subscription {
	unsubscribe: () => void;
}

interface Graphics {
	beginFill (string): Graphics;
	beginStroke (string): Graphics;
	drawRect: (startX: number, startY: number, endX: number, endY: number) => void;
	drawCircle: (startX: number, startY: number, r: number) => void;
	moveTo: (x: number, y: number) => void;
	lineTo: (x: number, y: number) => void;
}

interface Shape {
	graphics: Graphics;
	x: number;
	y: number;
}

interface Stage {
	graphics: Graphics;
	addChild (Shape);
	removeChild (Shape);
	update (): void;
	addEventListener (string, Function): void;
}

interface Createjs {
	Shape (): Shape;
	Stage (string): Stage;
}

// declare interface Bullet {
// 	x: number;
// 	y: number;
// 	destinationX: number;
// 	destinationY: number;
// 	graphics: Graphics;
// 	step: number;
// 	speed: number;
// 	subscription: Subscription;
// 	enemy: Enemy;
// 	die (): void;
// }

// interface EnemyActions {
// 	die: () => void;
// 	move: () => void;
// }

// interface Enemy {
// 	x: number;
// 	y: number;
// 	graphics: Graphics;
// 	step: number;
// 	speed: number;
// 	die (): void;
// 	subscription: Subscription;
// 	actions: EnemyActions;
// }

// interface Tower {
// 	x: number;
// 	y: number;
// 	range: number;
// 	reloadBulletTime: number;
// 	graphics: Graphics;
// 	stageClickSubscription:  Subscription;
// 	tickerSubscription:  Subscription;
// 	enemiesInRange: Array<Enemy>;
// 	enemySubscription:  Subscription;
// 	areaVisible: boolean;
// 	area: Shape;
// 	die (): void;
// 	fireToEnemy (Enemy): void;
// 	onClickHandler (Tower): void;
// 	addEventListener (string, Function): void;
// 	removeEventListener (string): void;
// }

// interface TowerShape {
// 	x: number;
// 	y: number;
// 	range: number;
// 	graphics: Graphics;
// 	areaVisible: boolean;
// 	area: Shape;
// }

interface Event {
	stageX: number;
	stageY: number;
}

declare interface Scenario {
	tickPerStep: number;
	parts: {
		[s: number]: { tickPerEnemy: number };
	};
}

declare interface StagePosition {
	x: number;
	y: number;
}
