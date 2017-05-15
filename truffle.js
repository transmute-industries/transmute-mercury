const LightWalletProvider = require('@digix/truffle-lightwallet-provider')

module.exports = {
  networks: {
    'development': {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      before_timeout: 300,             //  <=== NEW
      test_timeout: 300                //  <=== NEW
    },
    'ropsten': {
      provider: new LightWalletProvider({
        keystore: './sigmate-v3-ti.json',
        password: global.lightWalletPassword,
        rpcUrl: 'https://ropsten.infura.io',
        debug: true, // optional, show JSON-RPC logs
        // prefund: 1e18, // optional, fund all lightwallet addresses (via coinbase) with this of wei
        // optional, polling interval for the provider (reduce for faster deploy with testRPC or kovan)
        pollingInterval: 2000
      }),
      network_id: '*'
    },
    'parity': {
      network_id: '*',
      host: 'localhost',
      port: 8545
    }
  }
}
