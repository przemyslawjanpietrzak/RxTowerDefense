import 'package:rxdart/rxdart.dart';

import 'enemy.dart';

class EnemyBlock {
  final _enemies$ = new PublishSubject<List<Enemy>>();
  final List<Enemy> enemies = List();

  Observable<List<Enemy>> get enemies$ {
    return this._enemies$;
  }

  void onEnemyCreate(Enemy enemy) {
    this.enemies.add(enemy);
    this._enemies$.add(this.enemies);
  }

  void removeEnemy(Enemy enemy) {
    this.enemies.remove(enemy);
    this._enemies$.add(this.enemies);
  }

  void onEnemyMoves(Enemy enemy) {}

  void onEnemyDies(Enemy enemy) {}

  void onEnemyReachEnd(Enemy enemy) {}
}
