import 'rxjs/add/operator/filter';

import stage from "./stage/stage";
import { enemyFactory } from "./enemy/enemy";
import towerEngine from './tower/index';
import enemyEngine from './enemy/index';
import bulletEngine from './bullet/index';
import ticker from './ticker';
import path from "./path";
import "./engine";
import scenario from './scenario';
import { getTickerPerEnemy } from './utils';


stage.addChild(path);

towerEngine();
enemyEngine();
bulletEngine();


let counter = 0;
ticker
  .filter(() => ++counter % getTickerPerEnemy(counter, scenario) === 0)
  .subscribe(() => {
    enemyFactory();
    console.debug(getTickerPerEnemy(counter, scenario));
  });

ticker
  .subscribe(() => {
    stage.update();
  });