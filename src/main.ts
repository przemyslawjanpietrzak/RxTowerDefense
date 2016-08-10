import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import stage from "./stage";
import { enemyFactory } from "./enemy/index";
import { towerFactory } from "./tower/towers";
import ticker from './ticker';
import path from "./path";
import "./engine";

stage.addChild(path);
stage.update();

towerFactory(450, 300);
towerFactory(300, 300);
towerFactory(300, 450);

let counter = 0;
ticker
  .filter(() => ++counter % 6 === 0)
  .subscribe(() => {
    enemyFactory();
  });

ticker
  .subscribe(() => {
    stage.update();
  });