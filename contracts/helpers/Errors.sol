// SPDX-License-Identifier: BUSL-1.1
pragma solidity <=0.8.10;

/**
 * @title Errors library
 * @author Sepo
 * @notice Defines the error messages emitted by the different contracts of the SePo protocol
 */
library Errors {
    string public constant CALLER_WITH_NO_REQUIREMENTS = '1'; // 'The caller of the function has no the requirements'
    string public constant NOT_ENOUGH_AMOUNT_DEPOSITED_FREE_FOR_WITHDRAW = '2'; // 'The creditor has no std amount for withdraw'
    string public constant NOT_ENOUGH_AMOUNT_STDLOAN = '3'; // 'The creditor has no the amount for the stdloan'
}
