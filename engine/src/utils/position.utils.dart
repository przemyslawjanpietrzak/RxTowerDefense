import 'dart:math';

import '../domain.dart';
import '../tower/tower.config.dart';
import '../tower/tower.dart';


double getDistance(int x1, int y1, int x2, int y2) {
  return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
}

Position getPositionAfterMove(
    Position position, Position destination, double speed) {
  var angle = atan2(destination.y - position.y, destination.x - position.x);
  var x = position.x + speed * cos(angle);
  var y = position.y + speed * sin(angle);

  return Position(x.round(), y.round());
}

bool isInDistance(Tower tower, Position destination) {
  var distance = getDistance(
      tower.positionX, tower.positionY, destination.x, destination.y);
  return distance <= TowerConfig.TOWER_RANGE;
}
