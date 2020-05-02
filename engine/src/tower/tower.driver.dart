
import '../sink.dart';
import 'tower.dart';

Map<String, void Function(Sinks sink)> towerDriver = {
  "newTower": (sink) => {
    sink.menu.onConfirmTowerButtonClick$.listen((position) => {
      sink.tower.newTower$.add(Tower(position.x, position.y))
    })
  }
};
