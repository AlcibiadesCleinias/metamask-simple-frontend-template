import {ContractABC} from "./ContractABC";

const contractAddress = "0xf312DCD111571Fa4e8DaD3cfFaf412dE914C5677"//process.env.CONTRACT_ADDRESS


// It used to use web3 from
// <script src="https://cdn.jsdelivr.net/npm/web3@1.3.4/dist/web3.min.js"></script>.
// It uses several users fom Ganache chain.
// CI test example
async function test_contract() {
    console.log('----- CI TEST STARTED for ganachi -----')
    const _web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
    // Use web3 with account from ganache, and declare what account to use for each client.

    globalDebug = 'Your contract'

    await new Promise(r => setTimeout(r, 500))

    const accounts = await _web3.eth.getAccounts()
    const signer = accounts[1]

    console.log('---- CI TEST ENDED -----')
}

// Export hack
window.test_contract = test_contract
