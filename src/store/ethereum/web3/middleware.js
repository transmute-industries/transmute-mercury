import TransmuteFramework from 'env'

let web3 = TransmuteFramework.web3

// console.log(TransmuteFramework)

export const getAccounts = (_callback) => {
  if (web3) {
    web3.eth.getAccounts((err, addresses) => {
      if (err) { throw err }
      _callback(addresses)
    })
  } else {
    _callback([])
  }
}

export const sendTransaction = (transactionData, _callback) => {
  if (web3) {
    let amountInWei = web3.toWei(parseFloat(transactionData.amountInEther), 'ether')
    web3.eth.sendTransaction({
      from: transactionData.fromAddress,
      to: transactionData.toAddress,
      value: amountInWei
    }, (err, address) => {
      if (err) { throw err }
      _callback(address)
    })
  } else {
    _callback([])
  }
}
