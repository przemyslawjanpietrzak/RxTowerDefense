import 'package:rxdart/rxdart.dart';

import 'tower.dart';


class TowerBloc {
  final _towers$ = new PublishSubject<List<Tower>>();
  final towers = List<Tower>();

  void addTower(Tower tower) {
    this.towers.add(tower);
    this._towers$.add(this.towers);
  }

  void removeTower(Tower tower) {
    this.towers.remove(tower);
    this._towers$.add(this.towers);
  }

  Observable<List<Tower>> get towers$ {
    return this.towers$;
  }
}
