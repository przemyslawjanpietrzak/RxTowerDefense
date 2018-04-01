import { dieMessage } from '../settings';

import { EnemyPassAllPaths$ } from '../enemy/models';
import { ChangeWalletState$ } from '../wallet/models';

export default {
    changeWalletState$: ({ changeWalletState$ }: { changeWalletState$: ChangeWalletState$ }) => {
        changeWalletState$.subscribe((money: number) => {
            document.getElementById('money-count').innerHTML = String(money);
        });
    },
    enemyPassAllPaths$: ({ enemyPassAllPaths$ }: { enemyPassAllPaths$: EnemyPassAllPaths$}) => {
        enemyPassAllPaths$.subscribe(() => {
            const livesCount = parseInt(document.getElementById('lives-count').textContent, 10);
            if (livesCount <= 1) {
                window.alert(dieMessage);
                window.location.reload();
            } else {
                document.getElementById('lives-count').innerHTML = String(livesCount - 1);
            }
        });
    },
};
