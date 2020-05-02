import 'package:rxdart/subjects.dart';

import '../domain.dart';


class MenuSink {
  final onNewTowerButtonClick$ = PublishSubject<Position>();
  final onCancelTowerButtonClick$ = PublishSubject<Position>();
  final onConfirmTowerButtonClick$ = PublishSubject<Position>();
}