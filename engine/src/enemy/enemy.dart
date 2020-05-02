import '../domain.dart';
import '../utils/position.utils.dart';
import 'enemy.config.dart';

class Enemy {
  final reward = EnemyConfig.ENEMY_REWARD;

  bool isDead = false;
  int positionX;
  int positionY;
  int pathStep = 0;

  Enemy(this.positionX, this.positionY);

  get pathPoints => null;

  void move() {
    if (pathPoints.length <= this.pathStep) {
      return;
    }
    var destination = offsetToPosition(pathPoints[this.pathStep]);
    var position = Position(this.positionX, this.positionY);
    var newPosition = getPositionAfterMove(position, destination, EnemyConfig.ENEMY_SPEED);
    this.positionX = newPosition.x;
    this.positionY = newPosition.y;
    if (getDistance(this.positionX, this.positionY, destination.x, destination.y) < EnemyConfig.ENEMY_SPEED) {
      this.pathStep++;
    }
  }

  void die() {
    this.isDead = true;
  }

  offsetToPosition(pathPoint) {}
}
