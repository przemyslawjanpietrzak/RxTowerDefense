import '../enemy/enemy.dart';

import 'bullet.dart';

class BulletsHit { // TODO: simplify
  final Bullet bullet;
  final Enemy enemy;

  BulletsHit(this.bullet, this.enemy);
}
