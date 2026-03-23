// 🔥 MAIN APP
const App = {
  web3: null,
  account: null,
  contract: null,

  // 🔥 UPDATE THIS AFTER DEPLOY
  contractAddress: "0x02f1119954abc5020b92202aD55Ea8b1Be3EB953",

  abi: [
    {
      "inputs": [
        { "internalType": "string", "name": "_name", "type": "string" },
        { "internalType": "string", "name": "_date", "type": "string" },
        { "internalType": "string", "name": "_city", "type": "string" },
        { "internalType": "string", "name": "_state", "type": "string" }
      ],
      "name": "saveDetails",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ],

  // 🔥 CONNECT WALLET
  connectWallet: async function () {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    App.web3 = new Web3(window.ethereum);

    const accounts = await App.web3.eth.getAccounts();
    App.account = accounts[0];

    document.getElementById("walletAddress").innerText =
      "Connected: " + App.account;

    App.contract = new App.web3.eth.Contract(
      App.abi,
      App.contractAddress
    );
  },

  // 🔥 SAVE DETAILS (NO MERKLE TREE)
  saveDetails: async function () {

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    if (!name || !date || !city || !state) {
      alert("Please fill all fields");
      return;
    }

    document.getElementById("status").innerText =
      "⏳ Sending transaction...";

    try {
      await App.contract.methods
        .saveDetails(name, date, city, state)
        .send({
          from: App.account,
          value: App.web3.utils.toWei("1", "ether")
        });

      document.getElementById("status").innerText =
        "✅ Data saved successfully!";

    } catch (err) {
      console.error(err);
      document.getElementById("status").innerText =
        "❌ Transaction failed";
    }
  }
};

window.App = App;