import 'package:rxdart/rxdart.dart';
import 'package:rxdart/subjects.dart';

import '../enemy/enemy.dart';
import '../tower/tower.dart';
import 'wallet.dart';

class WalletBloc {
  final wallet = Wallet();

  final _wallet$ = PublishSubject<Wallet>();

  Observable<Wallet> get wallet$ {
    return this._wallet$;
  }

  onBuyTower(Tower tower) {
    this.wallet.buyTower(tower);
    this._emitWallet();
  }

  onSellTower(Tower tower) {
    this.wallet.sellTower(tower);
    this._emitWallet();
  }
  
  onEnemyDies(Enemy enemy) {
    this.wallet.getEnemyReward(enemy);
    this._emitWallet();
  }
  
  void _emitWallet() {
    this._wallet$.add(this.wallet);
  }
}