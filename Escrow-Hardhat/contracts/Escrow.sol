// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Escrow {
	address public arbiter;
	address payable public beneficiary;
	address payable public depositor;

	bool public isApproved;
	bool public isCancelled;

	constructor(address _arbiter, address payable _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter);
		require(isCancelled = false);
		uint balance = address(this).balance;
		beneficiary.transfer(balance);
		emit Approved(balance);
		isApproved = true;
	}

	event Cancelled(uint);

	function cancel() external payable {
		require(msg.sender == arbiter || msg.sender == depositor);
		require(isApproved = false);
		uint balance = address(this).balance;
		depositor.transfer(balance);
		emit Cancelled(balance);
		isCancelled = true;
	}
}
