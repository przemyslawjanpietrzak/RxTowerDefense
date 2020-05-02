import 'package:rxdart/rxdart.dart';

import 'tower.dart';
import 'tower.domain.dart';


class TowerSink {
  final newTower$ = PublishSubject<Tower>();
  final towerFiresToEnemy$ = PublishSubject<TowerFires>();
  final sellTower$ = PublishSubject<Tower>();
}
