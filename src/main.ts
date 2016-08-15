import 'rxjs/add/operator/filter';

import stage from "./stage/stage";
import { enemyFactory } from "./enemy/index";
import { towerFactory } from "./tower/towers";
import towerEngine from './tower/index';
import ticker from './ticker';
import path from "./path";
import "./engine";


stage.addChild(path);

towerEngine();
stage.update();

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