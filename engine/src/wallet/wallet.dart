
import '../enemy/enemy.dart';
import '../tower/tower.dart';
import 'wallet.config.dart';

class Wallet {
  int amount = WalletConfig.INITIAL_AMOUNT;

  buyTower(Tower tower) {
    this.amount -= tower.price;
  }

  sellTower(Tower tower) {
    this.amount += tower.sellPrice;
  }

  getEnemyReward(Enemy enemy) {
    this.amount += enemy.reward;
  }
}