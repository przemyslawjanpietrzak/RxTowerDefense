
import '../sink.dart';
import '../tower/tower.domain.dart';
import 'bullet.dart';

_createBullet(TowerFires towerFires) {
  var tower = towerFires.tower;
  var enemy = towerFires.enemy;

  return Bullet(tower.positionY, tower.positionY, enemy);
}

Map<String, void Function(Sinks sink)> bulletDrivers = {
  "towerFiresToEnemy": (sink) => {
        sink.tower.towerFiresToEnemy$.listen((towerFires) =>
            sink.bullet.bulletCreates$.add(_createBullet(towerFires)))
      },
  // "bullesMoves": (sink) =>
  //     {sink.ticker.tick$().listen((_) => sink.bulletSink.bulletMoves$.add(_))},
  //     "bulletHistsEnemy": (sink) => sink.bulletSink.bulletMoves$.
};
