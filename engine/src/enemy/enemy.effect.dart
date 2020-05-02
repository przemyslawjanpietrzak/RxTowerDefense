import '../overseer.dart';
import '../sink.dart';

Map<String, void Function(Sinks sink, Overseer overseer)> enemyEffect = {
  "enemyCreates": (sink, overseer) => sink.enemy.enemyCreates$
      .listen((enemy) => overseer.enemyBlock.onEnemyCreate(enemy)),
  "enemyMoves": (sink, overseer) => sink.enemy.enemyMoves$.listen(
      (_) => overseer.enemyBlock.enemies.forEach((enemy) => enemy.move())),
  "enemyDies": (sink, overseer) =>
      sink.enemy.enemyDies$.listen((enemy) => {overseer.enemyBlock.removeEnemy(enemy)})
};
