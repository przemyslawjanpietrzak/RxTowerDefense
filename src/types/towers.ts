interface Tower {
	x: number;
	y: number;
	range: number;
	reloadBulletTime: number;
	graphics: Graphics;
	subscribsion: any;
	enemiesInRange: Array<Enemy>;
	enemySubscription: any
	areaVisible: boolean
	area: Shape
	fireToEnemy(Enemy)
	onClickHandler(Tower)
	addEventListener(string, any)
}