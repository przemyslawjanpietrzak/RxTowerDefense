import 'package:rxdart/rxdart.dart';

import '../overseer.dart';
import '../sink.dart';
import 'bullet.dart';
import 'bullet.domain.dart';

void _bulletHitsEnemy(
    List<Bullet> bullets, PublishSubject<BulletsHit> bulletHitsEnemy$) {
  bullets
      .where((bullet) => bullet.isInEnemyRange)
      .map((bullet) => BulletsHit(bullet, bullet.target))
      .forEach((bulletsHit) => bulletHitsEnemy$.add(bulletsHit));
}

Map<String, void Function(Sinks sink, Overseer overseer)> bulletEffect = {
  "bulletMove": (sink, overseer) =>
      sink.bullet.bulletMoves$.listen((bulletMove) => {
            overseer.bulletBloc.bullets.forEach((bullet) => {bullet.move()})
          }),
  "bulletCreate": (sink, overseer) => {
        sink.bullet.bulletCreates$.listen((bulletsHit) =>
            {overseer.bulletBloc.createBullet(bulletsHit.bullet)})
      },
  "bulletHitsEnemy": (sink, overseer) => {
        sink.bullet.bulletMoves$.listen((_) => {
              _bulletHitsEnemy(
                  overseer.bulletBloc.bullets, sink.bullet.bulletHitsEnemy$)
            })
      },
  "bulletDies": (sink, overseer) => {
        sink.bullet.bulletHitsEnemy$.listen(
            (bulletHit) => {overseer.bulletBloc.removeBullet(bulletHit.bullet)})
      }
};
