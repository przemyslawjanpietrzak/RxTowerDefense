import 'rxjs/add/operator/filter';

import stage from "./stage/stage";
import { enemyFactory } from "./enemy/enemy";
import towerEngine from './tower/index';
import enemyEngine from './enemy/index';
import bulletEngine from './bullet/index';
import ticker from './ticker';
import path from "./path";
import "./engine";


stage.addChild(path);

towerEngine();
enemyEngine();
bulletEngine();


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