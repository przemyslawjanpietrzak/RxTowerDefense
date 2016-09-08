export default {
    bulletHitEnemy$: ({ bulletHitEnemy$ }) => {
        bulletHitEnemy$.subscribe((bullet: Bullet) => {
            window.setTimeout(() => { // TODO
                bullet.die();
            });
        });
    },
}