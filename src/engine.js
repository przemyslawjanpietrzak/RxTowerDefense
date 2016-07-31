import { Observable } from 'rx';

import { getDistance } from './utils';
import { enemy$, enemiesMove$ } from './enemy/index';
import { tower$, towerFireToEnemy$ } from './tower';
import { isInDistance } from './utils';
// import { bullet$ } from './bullet';

// init
let enemies = [];
const towers = [];
let bullets = [];

tower$.subscribe((tower) => { towers.push(tower); });

// tower detect enemy in his area
enemiesMove$.subscrive((enemy) => {
  const towerInRange = towers
    .filter((tower) => isInDistance(tower, enemy))
    .filter((tower) => tower.reloadBulltetTime === 0);
  towerInRange.forEach((tower) => { tower.fireToEnemy(enemy); });
});

// tower fire to enemy
towerFireToEnemy$.subscrive(({ tower, enemy }) => {
  
});
