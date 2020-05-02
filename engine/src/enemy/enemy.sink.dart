import 'package:rxdart/subjects.dart';

import 'enemy.dart';

class EnemySink {
  final enemyMoves$ = PublishSubject<void>();
  final enemyCreates$ = PublishSubject<Enemy>();
  final enemyDies$ = PublishSubject<Enemy>();
}