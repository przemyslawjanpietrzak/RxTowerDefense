import 'package:rxdart/rxdart.dart';
import 'package:rxdart/subjects.dart';

import '../tower/tower.dart';

class MenuBloc {
  Tower selectedTower = null;
  final _selecedTower$ = PublishSubject<Tower>();

  Observable<Tower> get selectedTower$ {
    return this._selecedTower$;
  }

  void selectTower(Tower tower) {
    this.selectedTower = tower;
    this._emitSelectedTower();
  }

  void unselectTower() {
    this.selectedTower = null;
    this._emitSelectedTower();
  }

  void _emitSelectedTower() {
    this._selecedTower$.add(this.selectedTower);
  }
}
