import { Observable } from 'rx';

import { enemy$, enemiesMove$ } from './enemy/index';
import { tower$, towerFireToEnemy$ } from './tower';
import { bulletFactory } from './bullet';
import { isInDistance, getDistance } from './utils';

// init
let enemies = [];
const towers = [];
let bullets = [];

tower$.subscribe((tower) => { towers.push(tower); });

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
  bulletFactory()
});
