
import '../sink.dart';
import 'enemy.dart';

Map<String, void Function(Sinks sink)> enemyDriver = {
  "enemyCreate": (sink) => {
        sink.ticker.tick$
            .where((i) => i % 170 == 0)
            .map((_) => Enemy(0, 0))
            .listen((enemy) => sink.enemy.enemyCreates$.add(enemy))
      },
  "enemyMoves": (sink) =>
      sink.ticker.tick$.listen((_) => sink.enemy.enemyMoves$.add(_)),
  "enemyDies": (sink) => sink.bullet.bulletHitsEnemy$
      .listen((bulletHit) => sink.enemy.enemyDies$.add(bulletHit.enemy))
};
