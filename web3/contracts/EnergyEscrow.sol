// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyEscrow {
    enum TradeStatus { Pending, Complete, Failed }
    
    struct Trade {
        address payable buyer;
        address payable seller;
        uint amount;
        TradeStatus status;
    }

    mapping(uint => Trade) public trades;
    uint public tradeCounter;

    address public verifier;

    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }

    constructor(address _verifier) {
        verifier = _verifier;
    }

    // Buyer creates a trade and deposits funds
    event TradeCreated(uint tradeId, address buyer, address seller, uint amount);
event TradeConfirmed(uint tradeId);
event TradeFailed(uint tradeId);

function createTrade(address payable _seller) external payable {
    require(msg.value > 0, "Must send funds to escrow");

    trades[tradeCounter] = Trade({
        buyer: payable(msg.sender),
        seller: _seller,
        amount: msg.value,
        status: TradeStatus.Pending
    });

    emit TradeCreated(tradeCounter, msg.sender, _seller, msg.value);

    tradeCounter++;
}

function confirmEnergyTransfer(uint _tradeId) external onlyVerifier {
    Trade storage trade = trades[_tradeId];
    require(trade.status == TradeStatus.Pending, "Trade not in pending status");

    trade.status = TradeStatus.Complete;

    // Release funds to seller
    trade.seller.transfer(trade.amount);
    emit TradeConfirmed(_tradeId);
}

function failEnergyTransfer(uint _tradeId) external onlyVerifier {
    Trade storage trade = trades[_tradeId];
    require(trade.status == TradeStatus.Pending, "Trade not in pending status");

    trade.status = TradeStatus.Failed;

    // Refund funds to buyer
    trade.buyer.transfer(trade.amount);
    emit TradeFailed(_tradeId);
}
}