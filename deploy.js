const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'ripple live skin island earn couch pupil physical earn credit boat hover',
    'https://rinkeby.infura.io/FRG5eafnfrJSjuhv2UJY');
// web3 instance used to access the rinkeby network specifically
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy
        ({ data: bytecode, arguments: ['Hi There!'] } )
        .send({ gas: '1000000', from: accounts[0]});

    console.log('Contract deployed to', result.options.address);
}

deploy();