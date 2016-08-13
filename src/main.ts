import 'rxjs/add/operator/filter';

import stage from "./stage/stage";
import { enemyFactory } from "./enemy/index";
import { towerFactory } from "./tower/towers";
import ticker from './ticker';
import path from "./path";
import "./engine";

stage.addChild(path);
stage.update();

towerFactory(120, 120);
towerFactory(300, 300);
towerFactory(110, 260);

let counter = 0;
ticker
  .filter(() => ++counter % 33 === 0)
  .subscribe(() => {
    enemyFactory();
  });

ticker
  .subscribe(() => {
    stage.update();
  });