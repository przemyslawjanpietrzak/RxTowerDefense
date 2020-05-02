
import '../overseer.dart';
import '../sink.dart';

Map<String, void Function(Sinks sink, Overseer overseer)> walletEffect = {
  "buyTower": (sink, overseer) => sink.tower.newTower$
      .listen((tower) => overseer.walletBloc.onBuyTower(tower)),
  "sellTower": (sink, overseer) => sink.tower.sellTower$
      .listen((tower) => overseer.walletBloc.onSellTower(tower)),
  "enemyReward": (sink, overseer) => sink.enemy.enemyDies$
      .listen((enemy) => overseer.walletBloc.onEnemyDies(enemy)),
};
