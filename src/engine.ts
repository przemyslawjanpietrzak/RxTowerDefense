// import { Observable } from "rx";

import { enemy$, enemiesMove$ } from "./enemy/index";
import { tower$, towerFireToEnemy$ } from "./tower/towers";
import { bullet$, bulletFactory } from "./bullet/bullet";
import { isInDistance } from "./utils";


const towers = [];
const enemies = [];
const bullets = [];
bullet$.subscribe((bullet: Bullet) => { bullets.push(bullet); });
enemy$.subscribe((enemy: Enemy) => { enemies.push(enemy); });
tower$.subscribe((tower: Tower) => { towers.push(tower); });

// tower detect enemy in his area
enemiesMove$.subscribe((enemy: Enemy) => {
  const towerInRange = towers
    .filter((tower: Tower) => isInDistance(tower, enemy))
    .filter((tower: Tower) => tower.reloadBulletTime === 0)
    ;
  towerInRange.forEach((tower: Tower) => { tower.fireToEnemy(enemy); });
});

// tower fire to enemy
towerFireToEnemy$.subscribe(({ tower, enemy }: { tower: Tower, enemy: Enemy }) => {
  bulletFactory(tower, enemy);
});
