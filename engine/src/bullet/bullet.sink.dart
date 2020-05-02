import 'package:rxdart/rxdart.dart';

import 'bullet.domain.dart';

class BulletSink {
  final bulletMoves$ = new PublishSubject<void>();
  final bulletHitsEnemy$ = new PublishSubject<BulletsHit>();
  final bulletCreates$ = new PublishSubject<BulletsHit>();
}
