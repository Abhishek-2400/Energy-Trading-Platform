// "use client";
// import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import { useSearchParams } from 'next/navigation';
// import './page.css';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// // Environment variables loaded in the component
// const CONTRACT_ADDRESS = "0x96EA19cE6e833fAcA06aC5Be66ec9355E78a9c4e";
// const CONTRACT_ABI = JSON.parse('[\
//     {\
//         "inputs": [\
//             {\
//                 "internalType": "uint256",\
//                 "name": "_transactionId",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "completeTransaction",\
//         "outputs": [],\
//         "stateMutability": "nonpayable",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [\
//             {\
//                 "internalType": "address",\
//                 "name": "_seller",\
//                 "type": "address"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "_units",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "initiateTransaction",\
//         "outputs": [],\
//         "stateMutability": "payable",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [\
//             {\
//                 "internalType": "uint256",\
//                 "name": "_transactionId",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "refundTransaction",\
//         "outputs": [],\
//         "stateMutability": "nonpayable",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [],\
//         "stateMutability": "nonpayable",\
//         "type": "constructor"\
//     },\
//     {\
//         "anonymous": false,\
//         "inputs": [\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "transactionId",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "address",\
//                 "name": "buyer",\
//                 "type": "address"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "address",\
//                 "name": "seller",\
//                 "type": "address"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "amount",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "units",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "TransactionCompleted",\
//         "type": "event"\
//     },\
//     {\
//         "anonymous": false,\
//         "inputs": [\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "transactionId",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "address",\
//                 "name": "buyer",\
//                 "type": "address"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "address",\
//                 "name": "seller",\
//                 "type": "address"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "amount",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "units",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "TransactionInitiated",\
//         "type": "event"\
//     },\
//     {\
//         "anonymous": false,\
//         "inputs": [\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "transactionId",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "address",\
//                 "name": "buyer",\
//                 "type": "address"\
//             },\
//             {\
//                 "indexed": false,\
//                 "internalType": "uint256",\
//                 "name": "amount",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "TransactionRefunded",\
//         "type": "event"\
//     },\
//     {\
//         "inputs": [],\
//         "name": "escrowAccount",\
//         "outputs": [\
//             {\
//                 "internalType": "address",\
//                 "name": "",\
//                 "type": "address"\
//             }\
//         ],\
//         "stateMutability": "view",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [\
//             {\
//                 "internalType": "uint256",\
//                 "name": "_transactionId",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "getTransaction",\
//         "outputs": [\
//             {\
//                 "internalType": "address",\
//                 "name": "buyer",\
//                 "type": "address"\
//             },\
//             {\
//                 "internalType": "address",\
//                 "name": "seller",\
//                 "type": "address"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "amount",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "units",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "timestamp",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "internalType": "bool",\
//                 "name": "isCompleted",\
//                 "type": "bool"\
//             }\
//         ],\
//         "stateMutability": "view",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [],\
//         "name": "TIMEOUT",\
//         "outputs": [\
//             {\
//                 "internalType": "uint256",\
//                 "name": "",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "stateMutability": "view",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [],\
//         "name": "transactionCount",\
//         "outputs": [\
//             {\
//                 "internalType": "uint256",\
//                 "name": "",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "stateMutability": "view",\
//         "type": "function"\
//     },\
//     {\
//         "inputs": [\
//             {\
//                 "internalType": "uint256",\
//                 "name": "",\
//                 "type": "uint256"\
//             }\
//         ],\
//         "name": "transactions",\
//         "outputs": [\
//             {\
//                 "internalType": "address",\
//                 "name": "buyer",\
//                 "type": "address"\
//             },\
//             {\
//                 "internalType": "address",\
//                 "name": "seller",\
//                 "type": "address"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "amount",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "units",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "internalType": "uint256",\
//                 "name": "timestamp",\
//                 "type": "uint256"\
//             },\
//             {\
//                 "internalType": "bool",\
//                 "name": "isCompleted",\
//                 "type": "bool"\
//             }\
//         ],\
//         "stateMutability": "view",\
//         "type": "function"\
//     }\
// ]');
// const EnergyPurchaseForm = () => {
//     const router = useRouter();

//     const searchParams = useSearchParams();
//     const id = searchParams.get('id');
//     const sellername = searchParams.get('sellername');
//     const selleremail = searchParams.get('selleremail');
//     const unitCost = searchParams.get('priceperunit');
//     const locations = searchParams.get('locations');
//     const maxUnitsAvailable = searchParams.get('tokens');
//     console.log(id, sellername, unitCost, locations, maxUnitsAvailable, selleremail);

//     const [units, setUnits] = useState(0);
//     const [totalCost, setTotalCost] = useState(0);
//     const [account, setAccount] = useState(null);

//     const updateTokens = async () => {
//         const payload = {
//             id: id,
//             units: units, //user purchased this will be added to user tokens & deducted form the seller 
//             selleremail: selleremail
//         }
//         try {
//             const response = await axios.post('/api/products/updatetoken', payload);
//             if (!response) {
//                 console.log('Error in updating tokens');
//             }
//             else {
//                 console.log('Tokens transferred successfully', response.data);
//                 alert('Tokens transferred successfully');
//             }
//         }
//         catch (error) {
//             console.log('Error in updating tokens');
//         }

//     }

//     const handleTransaction = async () => {
//         const payload = {
//             id: id,
//             sellername: sellername,
//             selleremail: selleremail,
//             unitCost: unitCost,
//             locations: locations,
//             units: units, //units bought (token)
//             totalCost: totalCost
//         }
//         try {
//             const response = await axios.post('/api/products/transaction', payload);
//             if (!response) {
//                 console.log('Error in transaction');
//             }
//             else {
//                 console.log('Transaction history successfully updated', response.data);
//                 alert('Transaction history successfully updated');
//                 router.push('/');
//             }
//         }
//         catch (error) {
//             console.log('Error in updating  transaction history', error.message);
//         }
//     }
//     useEffect(() => {
//         if (units >= 0 && units <= maxUnitsAvailable) {
//             setTotalCost(units * unitCost);
//         } else if (units > maxUnitsAvailable) {
//             setUnits(maxUnitsAvailable);
//         }
//     }, [units, unitCost, maxUnitsAvailable]);

//     // Connect to MetaMask
//     const connectWallet = async () => {
//         if (typeof window.ethereum !== "undefined") {
//             try {
//                 const accounts = await window.ethereum.request({
//                     method: "eth_requestAccounts",
//                 });
//                 setAccount(accounts[0]);
//             } catch (error) {
//                 console.error("Error connecting to MetaMask:", error);
//                 alert("Failed to connect MetaMask.");
//             }
//         } else {
//             alert("MetaMask is not installed. Please install it to proceed.");
//         }
//     };


//     // Handle payment with MetaMask

//     const handlePayment = async () => {
//         if (!account) {
//             alert("Please connect your MetaMask wallet first.");
//             return;
//         }

//         try {
//             // Initialize provider with the Web3Provider and get the signer
//             const provider = new ethers.BrowserProvider(window.ethereum);
//             const signer = await provider.getSigner();

//             // Set up contract instance with the signer
//             const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//             // Convert total cost to Ether and initiate the transaction
//             const transaction = await contract.initiateTransaction(
//                 "0x2Cc6Ac0E2A506f03aCB72a57fA9c1F164739dD4D", // Replace with the actual seller's address
//                 units,
//                 { value: ethers.parseEther(totalCost.toString()) }
//             );

//             await transaction.wait();
//             alert("Transaction successful!");
//             //call update function here to update the database
//             updateTokens();
//             handleTransaction();
//         } catch (error) {
//             console.error("Transaction failed", error);
//             alert("Transaction failed!");
//         }
//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc" }}>
//             <h2>Energy Purchase Form</h2>

//             <label>
//                 Units you want to purchase (KWh):
//                 <input
//                     type="number"
//                     min="1"
//                     max={maxUnitsAvailable}
//                     value={units}
//                     onChange={(e) => {
//                         const value = Number(e.target.value);
//                         if (value <= maxUnitsAvailable) {
//                             setUnits(value);
//                         } else {
//                             alert(`Maximum units available are ${maxUnitsAvailable}`);
//                         }
//                     }}
//                 />
//             </label>
//             <p>Max Units Available: {maxUnitsAvailable}</p>

//             <label>
//                 Platform Fee:
//                 <input type="text" value="0" disabled />
//             </label>

//             <label>
//                 Unit Cost (in ETH):
//                 <input type="text" value={unitCost} disabled />
//             </label>

//             <label>
//                 Total Amount (in ETH):
//                 <input type="text" value={totalCost.toFixed(4)} disabled />
//             </label>


//             {!account ? (
//                 <button className="custom-button connect-wallet-button" onClick={connectWallet}>
//                     Connect Wallet
//                 </button>
//             ) : (
//                 <button className="custom-button pay-now-button" onClick={handlePayment}>
//                     Pay Now
//                 </button>
//             )}

//         </div>
//     );
// };

// export default EnergyPurchaseForm;

"use client";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSearchParams } from "next/navigation";
import "./page.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const CONTRACT_ADDRESS = "0x96EA19cE6e833fAcA06aC5Be66ec9355E78a9c4e";
const CONTRACT_ABI = [
    {
        inputs: [
            { internalType: "address", name: "_seller", type: "address" },
            { internalType: "uint256", name: "_units", type: "uint256" },
        ],
        name: "initiateTransaction",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
];

const EnergyPurchaseForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get("id");
    const sellername = searchParams.get("sellername");
    const selleremail = searchParams.get("selleremail");
    const unitCost = parseFloat(searchParams.get("priceperunit")) || 0;
    const locations = searchParams.get("locations");
    const maxUnitsAvailable = parseInt(searchParams.get("tokens")) || 0;
    const sellerAddress = searchParams.get("selleraddress") || "0x2Cc6Ac0E2A506f03aCB72a57fA9c1F164739dD4D";

    const [units, setUnits] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [account, setAccount] = useState(null);

    const updateTokens = async () => {
        const payload = {
            id,
            units,
            selleremail,
        };
        try {
            const response = await axios.post("/api/products/updatetoken", payload);
            if (!response) {
                console.error("Error in updating tokens");
            } else {
                console.log("Tokens transferred successfully");
                alert("Tokens transferred successfully");

            }
        } catch (error) {
            console.error("Error in updating tokens:", error.message);
        }
    };

    const handleTransaction = async () => {
        const payload = {
            id,
            sellername,
            selleremail,
            unitCost,
            locations,
            units,
            totalCost,
        };
        try {
            const response = await axios.post("/api/products/transaction", payload);
            if (!response) {
                console.error("Error in updating transaction history");
            } else {
                console.log("Transaction history successfully updated");
                alert("Transaction history successfully updated");
                router.push("/");

            }
        } catch (error) {
            console.error("Error in updating transaction history:", error.message);
        }
    };

    useEffect(() => {
        if (units > 0 && units <= maxUnitsAvailable) {
            setTotalCost(units * unitCost);
        } else if (units > maxUnitsAvailable) {
            setUnits(maxUnitsAvailable);
        } else if (units < 0) {
            setUnits(0);
        }
    }, [units, unitCost, maxUnitsAvailable]);

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
                alert("Failed to connect MetaMask.");
            }
        } else {
            alert("MetaMask is not installed. Please install it to proceed.");
        }
    };

    const handlePayment = async () => {
        if (!account) {
            alert("Please connect your MetaMask wallet first.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const transaction = await contract.initiateTransaction(
                sellerAddress,
                units,
                { value: ethers.parseEther(totalCost.toString()) }
            );

            await transaction.wait();
            alert("Transaction successful!");

            // Only update the database after a successful payment
            await updateTokens();
            await handleTransaction();
        } catch (error) {
            console.error("Transaction failed:", error);
            alert(`Transaction failed: ${error.message}`);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", border: "1px solid #ccc" }}>
            <h2>Energy Purchase Form</h2>

            <label>
                Units you want to purchase (KWh):
                <input
                    type="number"
                    min="0"
                    max={maxUnitsAvailable}
                    value={units}
                    onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= maxUnitsAvailable && value >= 0) {
                            setUnits(value);
                        } else if (value > maxUnitsAvailable) {
                            alert(`Maximum units available are ${maxUnitsAvailable}`);
                            setUnits(maxUnitsAvailable);
                        } else {
                            setUnits(0);
                        }
                    }}
                />
            </label>
            <p>Max Units Available: {maxUnitsAvailable}</p>

            <label>
                Platform Fee:
                <input type="text" value="0" disabled />
            </label>

            <label>
                Unit Cost (in ETH):
                <input type="text" value={unitCost} disabled />
            </label>

            <label>
                Total Amount (in ETH):
                <input type="text" value={totalCost.toFixed(4)} disabled />
            </label>

            {!account ? (
                <button className="custom-button connect-wallet-button" onClick={connectWallet}>
                    Connect Wallet
                </button>
            ) : (
                <button className="custom-button pay-now-button" onClick={handlePayment}>
                    Pay Now
                </button>
            )}
        </div>
    );
};

export default EnergyPurchaseForm;
