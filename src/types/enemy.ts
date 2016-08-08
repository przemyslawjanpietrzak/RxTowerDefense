interface EnemyActions {
    die: any,
    move: any,
}

interface Enemy {
    x: number;
    y: number;
    graphics: Graphics
    step: number
    speed: number
    die()
    subscription: any
    actions: EnemyActions
}


