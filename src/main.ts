import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/timeInterval";

import stage from "./stage/stage";

import path from "./path";
import ticker$ from "./ticker";
import { getTickerPerEnemy } from "./utils";

import "./bullet/index";
import "./enemy/index";
import "./menu/index";
import scenario from "./scenario";
import "./tower/index";
import "./wallet/index";

import { stageClick$ } from "./stage/stage";

import { runWallet } from "./wallet/index";
import { changeWalletState$ } from "./wallet/sinks";

import { runMenu } from "./menu/index";
import {
	addTowerButtonClick$,
	cancelTowerButtonClick$,
	confirmTowerButtonClick$,
	playPauseButtonClick$,
} from "./menu/sinks";

import { runTower } from "./tower/index";
import { newTower$, towerFireToEnemy$ } from "./tower/sinks";

import { runBullet } from "./bullet/index";
import { bulletHitEnemy$, bulletMove$ } from "./bullet/sinks";

import { enemyFactory } from "./enemy/enemy";
import { enemyMove$, enemyPassAllPaths$ } from "./enemy/sinks";

stage.addChild(path);

const sinks = {
	ticker$,

	stageClick$,

	newTower$,
	towerFireToEnemy$,

	bulletMove$,
	bulletHitEnemy$,

	enemyPassAllPaths$,
	enemyMove$,

	changeWalletState$,

	addTowerButtonClick$,
	cancelTowerButtonClick$,
	confirmTowerButtonClick$,
	playPauseButtonClick$,
};

runWallet(sinks);
runMenu(sinks);
runBullet(sinks);
runTower(sinks);

let counter = 0; // TODO move to ticker's modules
ticker$
	.filter(() => ++counter % getTickerPerEnemy(counter, scenario) === 0)
	.subscribe(() => {
		enemyFactory();
	});

ticker$
	.subscribe(() => {
		stage.update();
	});
