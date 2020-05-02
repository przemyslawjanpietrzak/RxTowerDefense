
import '../enemy/enemy.dart';
import 'tower.config.dart';

class Tower {

  bool canHit = false;

  final int positionX;
  final int positionY;
  final price = TowerConfig.TOWER_PRICE;
  final sellPrice = (TowerConfig.TOWER_PRICE / 2).round();

  int _reloadBulletTime = 0;

  Tower(this.positionX, this.positionY);

  void sell() {}

  void fireToEnemy(Enemy enemy) {
    this._reloadBulletTime += TowerConfig.RELOAD_UNIT_TIME;
    this.canHit = false;
  }

  void onTick() {
    this._reloadBulletTime--;
    this.canHit = this._reloadBulletTime <= 0;
  }

}
