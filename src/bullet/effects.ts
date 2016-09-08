import { towerFireToEnemy$ } from "../tower/towers";
import { bulletFactory } from "./bullet";


export default {
    bulletHitEnemy$: ({ bulletHitEnemy$ }) => {
        bulletHitEnemy$.subscribe((bullet: Bullet) => {
            window.setTimeout(() => { // TODO
                bullet.die();
            });
        });
    },
}