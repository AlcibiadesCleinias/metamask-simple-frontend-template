// Iteration with web3 Poker Room Contract.
import {getWeb3Accounts} from "../utils/blockchain";

// Place contract abi below
const CONTRACT_ABI = []


export class ContractABC {
    constructor(web3, address="") {
        this.address = address
        this.web3 = web3
        this.contractObj = new web3.eth.Contract(CONTRACT_ABI, this.address)
    }

    parseToEth(v) {
        return this.web3.utils.fromWei(v)
    }

    parseToWei(v) {
        return this.web3.utils.toWei(v, 'ether')
    }

    async _callMethod(config, method="send", userAddress=null) {
        console.log("contract address is " + this.address)
        console.log("method is " + method);
        if (method === "send") {
            return await this._sendMethodImpl(
                config["method"],
                config["args"],
                config["value"],
                userAddress
            );
        }
        return await this._callMethodImpl(
            config["method"],
            config["args"],
            config["value"],
            userAddress
        );
    }

    async _buildMethod(method, args) {
        let methodInstance = this.contractObj.methods[method];
        return methodInstance(...args);
    }

    async _sendMethodImpl(method, args, value, userAddress=null) {
        const [sender] = await getWeb3Accounts(this.web3, userAddress);
        console.log("sender is " + sender);
        console.log("value is " + value);
        let methodFunc = await this._buildMethod(method, args)
        const tx = await methodFunc.send({
            from: sender,
            value: value,
            gas: 1000000,  // TODO: but in metamask ypu could make it yourself
            gasPrice: this.web3.utils.toWei('2', 'gwei')  // TODO: but in metamask ypu could make it yourself
        })
        console.log("tx: ", tx)
        return tx
    }

    async _callMethodImpl(method, args, value, userAddress=null) {
        const [sender] = await getWeb3Accounts(this.web3, userAddress);
        console.log("sender is " + sender);
        console.log("method is " + method);
        let methodFunc = await this._buildMethod(method, args)
        const tx = await methodFunc.call()
        console.log("tx: ", tx)
        return tx
    }

    async _getEvents(eventName, filterDict) {
        console.log('Fetch events with eventName ', eventName)
        console.log('Fetch events with filterDict ', filterDict)
        const events = await this.contractObj.getPastEvents(
            eventName,
            {
                filter: filterDict,
                fromBlock: 0,  // coz under the hood getPastEvents remembers last fetch.
            },
        );
        console.log('Fetched events, got', events);
        return events
    }
}
