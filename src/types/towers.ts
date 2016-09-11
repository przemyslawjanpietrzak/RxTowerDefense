interface Tower {
	x: number;
	y: number;
	range: number;
	reloadBulletTime: number;
	graphics: Graphics;
	enemySubscription: any;
	stageClickSubscription: any
	tickerSubscription: any
	enemiesInRange: Array<Enemy>;
	enemySubscription: any
	areaVisible: boolean
	area: Shape
	die()
	fireToEnemy(Enemy)
	onClickHandler(Tower)
	addEventListener(string, any)
	removeEventListener(string)

}

interface TowerShape {
	x: number;
	y: number;
	range: number;
	graphics: Graphics;
	areaVisible: boolean
	area: Shape
}