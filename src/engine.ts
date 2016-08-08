import { towerFireToEnemy$ } from "./tower/towers";
import { bulletFactory } from "./bullet/bullet";

// tower fire to enemy
towerFireToEnemy$.subscribe(({ tower, enemy }: { tower: Tower, enemy: Enemy }) => {
  bulletFactory(tower, enemy);
});
