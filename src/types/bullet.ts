interface Bullet {
    x: number;
    y: number;
    destinationX: number
    destinationY: number
    graphics: Graphics
    step: number
    speed: number
    subscription: any
    hitEnemySubscription: any
    enemy: Enemy
}
