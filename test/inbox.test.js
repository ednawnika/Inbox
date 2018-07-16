const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode } = require('../compile')

let accounts;
let inbox;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ 
        data: bytecode,
        arguments: ['Hi There'] })
        .send({ from: accounts[0], gas: '1000000' })
    });


describe('Inbox', () => {
    it('deploys a contract OLU', () => {
        assert.ok(inbox.options.address)

    });

    it('It has a default message OLU', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There')
    });

    it ('can change the message', async () => { 
    await inbox.methods.setMessage('bye OLU').send({ from: accounts[0] })
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye OLU');

    }
)
});




// creates an instance of web3 and connects us to the ganache network
// if we want a different network i.e rinkeby then we will change it here


// class Car {
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;


// beforeEach(() => {
//  car = new Car();
// });

// // no intrinsic link between class car,,, for organization purposes
// describe('Car', () => {

//     it('have a park function?', () => {
    
//         assert.equal(car.park(), 'stopped');
//     });


//     it('have a drive function?', () => {
    
//         assert.equal(car.drive(), 'vroom');
//     });
// });

// it Run a  test and make assertion
// describe Groups together 'it' functions