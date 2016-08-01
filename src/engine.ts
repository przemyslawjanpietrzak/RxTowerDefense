// import { Observable } from "rx";

import { enemy$, enemiesMove$ } from "./enemy/index";
import { tower$, towerFireToEnemy$ } from "./tower/towers";
import { bullet$, bulletFactory } from "./bullet/bullet";
import { isInDistance } from "./utils";


const towers = [];
const enemies = [];
const bullets = [];
bullet$.subscribe((bullet) => { bullets.push(bullet); });
enemy$.subscribe((enemy: Enemy) => { enemies.push(enemy); });


tower$.subscribe((tower: Tower) => { towers.push(tower); });

// tower detect enemy in his area
enemiesMove$.subscribe((enemy) => {
  const towerInRange = towers
    .filter((tower) => isInDistance(tower, enemy))
    .filter((tower) => tower.reloadBulltetTime === 0)
    ;
  towerInRange.forEach((tower) => { tower.fireToEnemy(enemy); });
});

// tower fire to enemy
towerFireToEnemy$.subscribe(({ tower, enemy }) => {
  bulletFactory(tower, enemy);
});
