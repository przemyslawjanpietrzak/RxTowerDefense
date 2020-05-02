import 'package:rxdart/rxdart.dart';
import 'package:rxdart/subjects.dart';

import 'bullet.dart';

class BulletBloc {
  List<Bullet> bullets;

  final _bullets$ = PublishSubject<List<Bullet>>();

  void createBullet(Bullet bullet) {
    this.bullets.add(bullet);
    this._bullets$.add(this.bullets);
  }

  void removeBullet(Bullet bullet) {
    this.bullets.remove(bullet);
    this._bullets$.add(this.bullets);
  }

  Observable<List<Bullet>> get bullets$ {
    return this._bullets$;
  }
}
