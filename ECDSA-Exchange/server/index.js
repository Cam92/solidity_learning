const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

const key1 = ec.genKeyPair();
const key2 = ec.genKeyPair();
const key3 = ec.genKeyPair();

const publicKey1 = key1.getPublic().encode('hex');
const publicKey2 = key2.getPublic().encode('hex');
const publicKey3 = key3.getPublic().encode('hex');

const privateKey1 = key1.getPrivate();
const privateKey2 = key2.getPrivate();
const privateKey3 = key3.getPrivate();

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {
  [publicKey1]: 100,
  [publicKey2]: 50,
  [publicKey3]: 75,
}

console.log('Addess 1 pbK: ' + publicKey1 + ' (' + balances[publicKey1] + ' ETH)');
console.log('Addess 2 pbK: ' + publicKey2 + ' (' + balances[publicKey2] + ' ETH)');
console.log('Addess 3 pbK: ' + publicKey3 + ' (' + balances[publicKey3] + ' ETH)');

console.log('');

console.log('Addess 1 prK: ' + privateKey1);
console.log('Addess 2 prK: ' + privateKey2);
console.log('Addess 3 prK: ' + privateKey3);

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount, signature} = req.body;

  var checkHash = [amount];
  console.log(signature);
  console.log(ec.keyFromPublic(sender, 'hex').verify(checkHash, signature));

  if (ec.keyFromPublic(sender, 'hex').verify(checkHash, signature)) {
    balances[sender] -= amount;
    balances[recipient] = (balances[recipient] || 0) + +amount;
  }
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
