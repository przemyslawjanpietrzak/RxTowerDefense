import { Observable } from 'rx';

import { getDistance } from './utils';
import { enemy$, enemiesMove$ } from './enemy';
import { tower$ } from './tower';
// import { bullet$ } from './bullet';

// init
let enemies = [];
const towers = [];
let bullets = [];

tower$.subscribe((tower) => { towers.push(tower); });

enemiesMove$.subscrive((enemy) => {
  const towerInRange = towers
    .filter((tower) => getDistance(tower.x, tower.y, enemy.x, enemy.y) <= tower.range)
    .filter((tower) => tower.reloadBulltetTime === 0);
  towerInRange.forEach((tower) => { tower.fireToEnemy(enemy); });
});
