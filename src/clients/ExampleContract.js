import {ContractABC} from "./ContractABC";


export class ExampleContract extends ContractABC {
    // convenience method to parse to eth.

    async getProblem(problemId) {
        null
    }

    // Stake is a returnable fee for worker, in wei.
    async _getStakeValue() {
        let requestConfig = {
            "method": "problemStake",
            "args": [],
            "value": 0
        }
        return await this._callMethod(requestConfig, 'call')
    }

    // uint problemId,
    // address signal,
    // uint256 root,
    // uint256 nullifierHash,
    // uint256[8] calldata proof
    async startProblem(
        problemId,
        signal,
        root,
        nullifierHash,
        proof
    ) {
        const fee = await this._getStakeValue()
        let requestConfig = {
            "method": "joinProblem",
            "args": [
                problemId,
                signal,
                root,
                nullifierHash,
                proof
            ],
            "value": fee
        }
        return await this._callMethod(requestConfig, 'send')
    }
}


// Example how to hack import in index.html.
window.ExampleContract = ExampleContract
