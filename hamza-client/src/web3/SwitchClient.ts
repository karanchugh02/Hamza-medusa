import { BigNumberish, ethers } from 'ethers'

/**
 * Input params to a single payment to the Switch.
 */
export interface IPaymentInput {
    payer: string
    receiver: string
    id: BigNumberish
    amount: BigNumberish
}

/**
 * Input params to a payment to the Switch, plus a property indicating the currency
 * in which the payment is being made.
 */
export interface IPaymentInputCurrency extends IPaymentInput {
    currency: string //token address, or ethers.ZeroAddress for native
}

/**
 * Input params for multiple concurrent payments to the switch.
 */
export interface IMultiPaymentInput {
    receiver: string
    currency: string //token address, or ethers.ZeroAddress for native
    payments: IPaymentInput[]
}

/**
 * Client-side Switch contract client; allows for payments to be made.
 */
export class SwitchClient {
    contractAddress: string
    paymentSwitch: ethers.Contract
    tokens: { [id: string]: ethers.Contract } = {}

    /**
     * Constructor.
     * @param address Address of the PaymentSwitch contract
     */
    constructor(address: string) {
        this.contractAddress = address
        this.paymentSwitch = new ethers.Contract(this.contractAddress, [], null)
    }

    /**
     * Place a single payment in a single currency.
     * @param input The payment input
     */
    async placeSinglePayment(input: IPaymentInputCurrency) {
        await this.paymentSwitch.placePayment(input)
    }

    /**
     * Place multiple payments in single or multiple different currencies.
     * @param inputs An array of payment inputs
     */
    async placeMultiplePayments(inputs: IMultiPaymentInput[]) {
        //make any necessary token approvals
        await this._approveAllTokens(this.contractAddress, inputs)

        //place payments
        await this.paymentSwitch.placeMultiplePayments(inputs)
    }

    /**
     * In a batch of payments to be made, total up the amounts per currency. Returns a
     * dictionary of distinct token addresses, with their respective total amounts.
     *
     * @param inputs An array of payment inputs
     * @returns A dictionary in which the keys are token addresses, the values are amounts.
     */
    _getTokensAndAmounts(inputs: IMultiPaymentInput[]): {
        [id: string]: BigNumberish
    } {
        const output: { [id: string]: BigNumberish } = {}
        const sum = (arr: { amount: BigNumberish }[]) =>
            arr.reduce(
                (acc, obj) => BigInt(acc) + BigInt(obj.amount),
                BigInt(0)
            )

        inputs.forEach((i) => {
            //place a 0 if entry is null, otherwise place a sum of all payments
            if (i.currency != ethers.ZeroAddress) {
                output[i.currency] = output[i.currency]
                    ? BigInt(output[i.receiver]) + sum(i.payments)
                    : 0
            }
        })
        return output
    }

    /**
     * Gets the token contract corresponding to the given address, and stores it
     * for later.
     *
     * @param address An ERC20 token address
     * @returns An ethers.Contract object
     */
    _getTokenContract(address: string): ethers.Contract {
        let output: ethers.Contract = this.tokens[address]

        //if not yet created, create & store it
        if (!output) {
            output = new ethers.Contract(address, [], null)
            this.tokens[address] = output
        }

        return output
    }

    /**
     * Given an array of payment inputs, makes any token approvals that are necessary
     * in order for the payments to be completed.
     *
     * @param spender The contract address which will receive approval
     * @param inputs An array of payment inputs
     */
    async _approveAllTokens(
        spender: string,
        inputs: IMultiPaymentInput[]
    ): Promise<void> {
        const tokenAmounts = this._getTokensAndAmounts(inputs)

        //approve each token amount
        const promises: Promise<void>[] = []
        for (const tokenAddr in tokenAmounts) {
            promises.push(
                this._approveToken(spender, tokenAddr, tokenAmounts[tokenAddr])
            )
        }
        await Promise.all(promises)
    }

    /**
     * Approves an amount of a token to be spent, if the existing allowance is insufficient.
     *
     * @param spender The contract address which will receive approval
     * @param tokenAddr The token address
     * @param amount The amount that needs to be approved
     */
    async _approveToken(
        spender: string,
        tokenAddr: string,
        amount: BigNumberish
    ): Promise<void> {
        const token = this._getTokenContract(tokenAddr)

        //check first for existing allowance before approving
        const allowance = BigInt(
            await token.allowance(/*owner*/ ethers.ZeroAddress, spender)
        )
        if (allowance > 0) {
            amount = allowance < amount ? BigInt(amount) - allowance : 0
        }

        //approve
        if (amount > 0) {
            await token.approve(spender, amount)
        }
    }
}
