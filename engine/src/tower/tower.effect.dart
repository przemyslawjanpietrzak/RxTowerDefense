import 'package:rxdart/subjects.dart';


import '../enemy/enemy.dart';
import '../overseer.dart';
import '../sink.dart';
import '../utils/utils.dart';
import 'tower.dart';
import 'tower.domain.dart';

Future<void> _towerFires(List<Tower> towers, List<Enemy> enemies,
    PublishSubject<TowerFires> towerFiresToEnemy$) async {
  towers
      .where((tower) => tower.canHit)
      .map((tower) => TowerFires(getEnemiesInRange(enemies, tower)[0], tower))
      .forEach((towerFires) => towerFiresToEnemy$.add(towerFires));
}

Map<String, void Function(Sinks sink, Overseer overseer)> towerEffect = {
  "newTower": (sink, overseer) => sink.tower.newTower$
      .listen((tower) => overseer.towerBloc.addTower(tower)),
  "towerTick": (sink, overseer) => sink.ticker.tick$.listen(
      (_) => overseer.towerBloc.towers.forEach((tower) => tower.onTick())),
  "towerFiresToEnemy": (sink, overseer) => {
        sink.ticker.tick$.listen((_) => _towerFires(overseer.towerBloc.towers,
            overseer.enemyBlock.enemies, sink.tower.towerFiresToEnemy$))
      },
  "sellTower": (sink, overseer) => {
    sink.tower.sellTower$.listen((tower) => overseer.towerBloc.removeTower(tower))
  },
};
