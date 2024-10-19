// Connect to the blockchain
window.addEventListener('load', async () => {
    // Check for MetaMask or other Web3 provider
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
            return;
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    // Get the user's account and balance
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    const balanceInEther = web3.utils.fromWei(balance, 'ether');

    // Display the account and balance on the webpage
    document.getElementById('account').innerText = `Account: ${account}`;
    document.getElementById('balance').innerText = `Balance: ${balanceInEther} ETH`;

    // Event listener for posting a tweet
    document.getElementById('postTweetButton').addEventListener('click', () => {
        const tweetContent = document.getElementById('tweetInput').value;
        if (!tweetContent) {
            alert("Please enter a tweet.");
            return;
        }

        // Append the tweet to the feed
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet';
        tweetElement.innerText = `${account}: ${tweetContent}`;
        document.getElementById('tweetsContainer').prepend(tweetElement);

        // Clear the tweet input
        document.getElementById('tweetInput').value = '';
    });
});
