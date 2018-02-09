import { dieMessage } from "../settings";

export default {
	changeWalletState$: ({ changeWalletState$ }) => {
		changeWalletState$.subscribe((money) => {
			document.getElementById("money-count").innerHTML = money;
		});
	},
	enemyPassAllPaths$: ({ enemyPassAllPaths$ }) => {
		enemyPassAllPaths$.subscribe(() => {
			const livesCount: number = parseInt(document.getElementById("lives-count").textContent, 10);
			if (livesCount <= 1) {
				window.alert(dieMessage);
				window.location.reload();
			} else {
				document.getElementById("lives-count").innerHTML = String(livesCount - 1);
			}
		});
	},
};
