import 'bullet/bullet.driver.dart';
import 'bullet/bullet.effects.dart';

import 'enemy/enemy.driver.dart';
import 'enemy/enemy.effect.dart';

import 'tower/tower.driver.dart';
import 'tower/tower.effect.dart';

import 'wallet/wallet.effect.dart';

import 'overseer.dart';
import 'sink.dart';

class Engine {
  Overseer overseer;
  Sinks sink;

  Engine() {
    this.overseer = Overseer();
    this.sink = Sinks();
  }

  void run() {
    _runDrivers(this.sink, bulletDrivers);
    _runDrivers(this.sink, enemyDriver);
    _runDrivers(this.sink, towerDriver);

    _runEffects(this.sink, this.overseer, bulletEffect);
    _runEffects(this.sink, this.overseer, enemyEffect);
    _runEffects(this.sink, this.overseer, towerEffect);
    _runEffects(this.sink, this.overseer, walletEffect);
  }

  void _runEffects(Sinks sink, Overseer overseer,
          Map<String, void Function(Sinks sink, Overseer overseer)> effects) =>
      effects.values.forEach((effect) => effect(sink, overseer));

  void _runDrivers(
          Sinks sink, Map<String, void Function(Sinks sink)> drivers) =>
      drivers.values.forEach((driver) => driver(sink));
}
