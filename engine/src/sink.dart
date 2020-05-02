
import 'bullet/bullet.sink.dart';
import 'enemy/enemy.sink.dart';
import 'menu/menu.sink.dart';
import 'scenario/scenario.sink.dart';
import 'ticker.dart';
import 'tower/tower.sink.dart';

class Sinks {
  final tower = TowerSink();
  final enemy = EnemySink();
  final bullet = BulletSink();
  final menu = MenuSink();
  final scenario = ScenarioSink();

  final ticker = Ticker();
}
