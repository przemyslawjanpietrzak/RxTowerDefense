import 'dart:math';

import 'scenario.config.dart';


class Scenario {
  int _wave = 0;
  int _currentTick = 0;

  get enemiesPerTick {
    var enemiesPerTick = ScenarioConfig.ENEMY_PER_TICK;
    var enemiesIncrease = ScenarioConfig.ENEMIES_INCREASE;

    return pow(enemiesIncrease, this._wave) * enemiesPerTick;
  }

  get waveDuration {
    var durationIncrease = ScenarioConfig.DURATION_INCREASE;
    var duration = ScenarioConfig.WAVE_DURATION;

    return pow(durationIncrease, this._wave) * duration;
  }

  void startWave() {
    this._wave++;
  }

  void endWave() {}

  void onTick(int currentTick) {
    this._currentTick = currentTick;
  }
}
