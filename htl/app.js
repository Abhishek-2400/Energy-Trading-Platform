

  window.addEventListener('load', async () => {
    const web3 = new Web3("http://127.0.0.1:7545");  // Default Ganache RPC URL
  
    // Contract details
    const contractAddress = '0x2519A81D2d4aDb994343d321C9f608d70C7B15e6';  // Replace with your deployed contract address
  const contractABI =  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_verifier",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeId",
          "type": "uint256"
        }
      ],
      "name": "TradeConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TradeCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tradeId",
          "type": "uint256"
        }
      ],
      "name": "TradeFailed",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "tradeCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "trades",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "buyer",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "enum EnergyEscrow.TradeStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "verifier",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_seller",
          "type": "address"
        }
      ],
      "name": "createTrade",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeId",
          "type": "uint256"
        }
      ],
      "name": "confirmEnergyTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_tradeId",
          "type": "uint256"
        }
      ],
      "name": "failEnergyTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]; // Replace with your contract ABI
  
    let contract = new web3.eth.Contract(contractABI, contractAddress);
    let accounts = await web3.eth.getAccounts();
    let currentAccount = accounts[0];  // Default to the first Ganache account
    console.log(currentAccount)
  
    // Create a trade
   // Create a trade
document.getElementById('createTradeButton').onclick = async () => {
  const sellerAddress = document.getElementById('sellerAddress').value;
  const tradeAmount = document.getElementById('tradeAmount').value;

  try {
    console.log("Creating trade with seller:", sellerAddress, "and amount:", tradeAmount);
    await contract.methods.createTrade(sellerAddress).send({
      from: currentAccount,
      value: web3.utils.toWei(tradeAmount, 'ether')
    });
    document.getElementById('resultMessage').innerText = "Trade created successfully!";
  } catch (error) {
    console.error("Error during trade creation:", error);
    document.getElementById('resultMessage').innerText = `Failed to create trade: ${error.message}`;
  }
};

// Confirm energy transfer
document.getElementById('confirmTransferButton').onclick = async () => {
  const tradeId = document.getElementById('confirmTradeId').value;

  try {
    console.log("Confirming transfer for trade ID:", tradeId);
    await contract.methods.confirmEnergyTransfer(tradeId).send({
      from: currentAccount
    });
    document.getElementById('resultMessage').innerText = "Energy transfer confirmed!";
  } catch (error) {
    console.error("Error during transfer confirmation:", error);
    document.getElementById('resultMessage').innerText = `Failed to confirm transfer: ${error.message}`;
  }
};

// Fail energy transfer
document.getElementById('failTransferButton').onclick = async () => {
  const tradeId = document.getElementById('failTradeId').value;

  try {
    console.log("Failing transfer for trade ID:", tradeId);
    await contract.methods.failEnergyTransfer(tradeId).send({
      from: currentAccount
    });
    document.getElementById('resultMessage').innerText = "Energy transfer failed!";
  } catch (error) {
    console.error("Error during transfer failure:", error);
    document.getElementById('resultMessage').innerText = `Failed to fail transfer: ${error.message}`;
  }
};
  });