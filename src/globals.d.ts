interface Graphics {
	beginFill(string): Graphics;
	beginStroke(string): Graphics;
	drawRect: any;
	drawCircle: any;
	moveTo: any;
	lineTo: any;
}

interface Shape {
	graphics: Graphics;
	x: number;
	y: number;
}

interface Stage {
	graphics: Graphics;
	addChild(Shape);
	removeChild(Shape);
	update();
}

interface Createjs {
	Shape(): Shape;
	Stage(string): Stage;
}

declare interface Bullet {
	x: number;
	y: number;
	destinationX: number;
	destinationY: number;
	graphics: Graphics;
	step: number;
	speed: number;
	subscription: any;
	hitEnemySubscription: any;
	enemy: Enemy;
	die();
}

interface EnemyActions {
	die: any;
	move: any;
}

interface Enemy {
	x: number;
	y: number;
	graphics: Graphics;
	step: number;
	speed: number;
	die();
	subscription: any;
	actions: EnemyActions;
}

interface Tower {
	x: number;
	y: number;
	range: number;
	reloadBulletTime: number;
	graphics: Graphics;
	stageClickSubscription: any;
	tickerSubscription: any;
	enemiesInRange: Enemy[];
	enemySubscription: any;
	areaVisible: boolean;
	area: Shape;
	die();
	fireToEnemy(Enemy);
	onClickHandler(Tower);
	addEventListener(string, any);
	removeEventListener(string);

}

interface TowerShape {
	x: number;
	y: number;
	range: number;
	graphics: Graphics;
	areaVisible: boolean;
	area: Shape;
}

interface Vector {
	x: number;
	y: number;
	angle(): number;
	length(): number;
}

interface Event {
	stageX: number;
	stageY: number;
}

declare interface Scenario {
	tickPerStep: number;
	parts: {
		[s: number]: { tickPerEnemy: number };
	}

}