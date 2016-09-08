export default {
    changeWalletState$: ({ changeWalletState$ }) => {
        changeWalletState$.subscribe((money) => {
            document.getElementById('money-count').innerHTML = money;
        });
    }
}