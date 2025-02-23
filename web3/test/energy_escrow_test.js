const EnergyEscrow = artifacts.require("EnergyEscrow");

contract("EnergyEscrow", (accounts) => {
  const [buyer, seller, verifier, otherAccount] = accounts;

  let escrowInstance;

  beforeEach(async () => {
    // Deploy the contract with the verifier account
    escrowInstance = await EnergyEscrow.new(verifier);
  });

  it("should create a trade with correct details", async () => {
    // Buyer creates a trade and deposits 1 ether
    const amount = web3.utils.toWei('1', 'ether');
    await escrowInstance.createTrade(seller, { from: buyer, value: amount });

    // Check that trade was created with correct details
    const trade = await escrowInstance.trades(0);
    assert.equal(trade.buyer, buyer, "Buyer address is incorrect");
    assert.equal(trade.seller, seller, "Seller address is incorrect");
    assert.equal(trade.amount.toString(), amount, "Trade amount is incorrect");
    assert.equal(trade.status.toString(), '0', "Trade status should be 'Pending'");
  });

  it("should allow the verifier to confirm energy transfer and release funds", async () => {
    // Create a trade with 1 ether deposit
    const amount = web3.utils.toWei('1', 'ether');
    await escrowInstance.createTrade(seller, { from: buyer, value: amount });

    // Record initial seller balance
    const initialSellerBalance = web3.utils.toBN(await web3.eth.getBalance(seller));

    // Verifier confirms the energy transfer
    await escrowInstance.confirmEnergyTransfer(0, { from: verifier });

    // Check that the trade status is now 'Complete'
    const trade = await escrowInstance.trades(0);
    assert.equal(trade.status.toString(), '1', "Trade status should be 'Complete'");

    // Verify that the seller received the funds
    const finalSellerBalance = web3.utils.toBN(await web3.eth.getBalance(seller));
    assert(finalSellerBalance.sub(initialSellerBalance).toString() === amount, "Seller should receive the trade amount");
  });

  it("should allow the verifier to fail energy transfer and refund buyer", async () => {
    // Create a trade with 1 ether deposit
    const amount = web3.utils.toWei('1', 'ether');
    await escrowInstance.createTrade(seller, { from: buyer, value: amount });

    // Record initial buyer balance
    const initialBuyerBalance = web3.utils.toBN(await web3.eth.getBalance(buyer));

    // Verifier fails the energy transfer
    await escrowInstance.failEnergyTransfer(0, { from: verifier });

    // Check that the trade status is now 'Failed'
    const trade = await escrowInstance.trades(0);
    assert.equal(trade.status.toString(), '2', "Trade status should be 'Failed'");

    // Verify that the buyer received a refund
    const finalBuyerBalance = web3.utils.toBN(await web3.eth.getBalance(buyer));
    assert(finalBuyerBalance.gt(initialBuyerBalance), "Buyer should receive a refund");
  });

  it("should not allow non-verifiers to confirm or fail energy transfers", async () => {
    // Create a trade with 1 ether deposit
    const amount = web3.utils.toWei('1', 'ether');
    await escrowInstance.createTrade(seller, { from: buyer, value: amount });

    // Try to confirm the energy transfer from a non-verifier account
    try {
      await escrowInstance.confirmEnergyTransfer(0, { from: otherAccount });
      assert.fail("Non-verifier should not be able to confirm energy transfer");
    } catch (error) {
      assert(error.toString().includes("Only verifier can call this function"), "Expected verifier-only restriction");
    }

    // Try to fail the energy transfer from a non-verifier account
    try {
      await escrowInstance.failEnergyTransfer(0, { from: otherAccount });
      assert.fail("Non-verifier should not be able to fail energy transfer");
    } catch (error) {
      assert(error.toString().includes("Only verifier can call this function"), "Expected verifier-only restriction");
    }
  });

  it("should not allow trade completion if not in pending status", async () => {
    // Create a trade with 1 ether deposit
    const amount = web3.utils.toWei('1', 'ether');
    await escrowInstance.createTrade(seller, { from: buyer, value: amount });

    // Verifier confirms the energy transfer
    await escrowInstance.confirmEnergyTransfer(0, { from: verifier });

    // Try to confirm the trade again (should fail)
    try {
      await escrowInstance.confirmEnergyTransfer(0, { from: verifier });
      assert.fail("Should not be able to confirm trade again");
    } catch (error) {
      assert(error.toString().includes("Trade not in pending status"), "Expected pending status restriction");
    }
  });
});