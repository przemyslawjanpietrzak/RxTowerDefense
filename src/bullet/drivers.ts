import { Observable } from 'rxjs/Rx';
import { getDistance } from './../utils';
import { bulletFactory } from './bullet';


const bullets: Array<Bullet> = [];
const drivers = {
    bulletHitEnemy$: ({ ticker$ }) => ticker$
        .flatMap(() => Observable.from(bullets))
        .filter(
            (bullet: Bullet) => getDistance(bullet.x, bullet.y, bullet.destinationX, bullet.destinationY) <= bullet.speed
        ),
    bullets$: ({ bulletHitEnemy$, towerFireToEnemy$ }) => Observable.merge(
        bulletHitEnemy$
            .map((bullet: Bullet) => {
                bullets.splice(bullets.indexOf(bullet), 1);
                return bullets;
            }),
        towerFireToEnemy$
            .map(({ tower, enemy }: { tower: Tower, enemy: Enemy }) => bulletFactory(tower, enemy))
            .map((bullet: Bullet) => {
                bullets.push(bullet);
                return bullets;
            })
    ),
};

export default drivers;
