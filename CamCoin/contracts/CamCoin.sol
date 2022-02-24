//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CamCoin is ERC20 {
    uint constant _initial_supply = 1500 * (10**18);

    constructor() ERC20("CamCoin", "CC") {
        _mint(msg.sender, _initial_supply);
    }
}