
import 'bullet/bullet.bloc.dart';
import 'enemy/enemy.bloc.dart';
import 'menu/menu.bloc.dart';
import 'scenario/scenario.bloc.dart';
import 'tower/tower.bloc.dart';
import 'wallet/wallet.bloc.dart';

class Overseer {
  final towerBloc = TowerBloc();
  final enemyBlock = EnemyBlock();
  final bulletBloc = BulletBloc();
  final scenarioBloc = ScenarioBloc();
  final menuBloc = MenuBloc();
  final walletBloc = WalletBloc();
}
