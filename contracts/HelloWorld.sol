// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17; // 無いとコンパイルするときに警告出るので

contract HelloWorld {
    function getMessage() external pure returns (string memory) {
        return  "Hello World";
    }
}