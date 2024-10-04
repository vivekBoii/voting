// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {
  // Deploy the VotingContract without the value property
  const votingContract = m.contract("VotingContract", []); // No value provided

  return { votingContract };
});
