interface Graphics {
    beginFill(string): Graphics
    beginStroke(string): Graphics
    drawRect(number, number, number, number): Graphics
    drawCircle(number, number, number)
    moveTo(number, number)
    lineTo(number, number)
}

interface Shape {
    graphics: Graphics;
    x: number;
    y: number;
}

interface Stage {
    graphics: Graphics;
    addChild(Shape)
    removeChild(Shape)
    update()
}

interface Createjs {
    Shape(): Shape;
    Stage(string): Stage;
}

interface Tower {
    x: number;
    y: number;
    range: number;
    reloadBulletTime: number;
    graphics: Graphics;
    fireToEnemy(Enemy);
    subscribsion: any;
    enemiesInRange: Array<Enemy>;
    enemySubscription: any
}