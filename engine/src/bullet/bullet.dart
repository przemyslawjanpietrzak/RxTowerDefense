import '../enemy/enemy.dart';

class Bullet {
  bool isInEnemyRange = false;
  int _positionX;
  int _positionY;

  final Enemy target;

  Bullet(this._positionX, this._positionY, this.target);

  void die() {}

  void move() {
    this.isInEnemyRange = this._isInEnemyRange();
  }

  bool _isInEnemyRange() {
    return false;
  }
}
