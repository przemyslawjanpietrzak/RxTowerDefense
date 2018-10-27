import { LOOSE_MESSAGE } from './settings';

import { EnemyPassAllPaths$ } from '../enemy/models';
import { ChangeWalletState$ } from '../wallet/models';

export default {
    changeWalletState$: ({ changeWalletState$ }: { changeWalletState$: ChangeWalletState$ }) => {
        changeWalletState$.subscribe((money: number) => {
            (document.getElementById('money-count') as HTMLElement).innerHTML = String(money);
        });
    },
    enemyPassAllPaths$: ({ enemyPassAllPaths$ }: { enemyPassAllPaths$: EnemyPassAllPaths$}) => {
        enemyPassAllPaths$.subscribe(() => {
            const livesCountElement = document.getElementById('lives-count') as HTMLElement;
            const livesCount = parseInt(livesCountElement.textContent as string, 10);
            if (livesCount <= 0) {
                window.alert(LOOSE_MESSAGE);
                window.location.reload();
            } else {
                (document.getElementById('lives-count') as HTMLElement).innerHTML = String(livesCount - 1);
            }
        });
    },
};
