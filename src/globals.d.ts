
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
