# Cross Pay Crypto Smart Contracts

*Contracts resposible for the settlement of the payment*

## Testnets

### Network **Goerli**

```
Network name: goerli
Chain Id: 5
Network scan: https://goerli.etherscan.io/
````

> Payment Contract deployed at [0x294eb269DD01e2700dB044F9fA9bF86dBf71aB45](https://goerli.etherscan.io/address/0x294eb269DD01e2700dB044F9fA9bF86dBf71aB45)

> Owner: [0x531d57798205714B688cCEA0b5D99427c1B184F1](https://goerli.etherscan.io/address/0x531d57798205714B688cCEA0b5D99427c1B184F1)

### Network **Mumbai**

```
Network name: maticmum
Chain Id: 80001
Network scan: https://mumbai.polygonscan.com/
````

> Payment Contract deployed at [0xFBFCdc423b57d9Ec13A9937b764d7A7f9D5D8EE8](https://mumbai.polygonscan.com/address/0xFBFCdc423b57d9Ec13A9937b764d7A7f9D5D8EE8)

> Owner: [0x531d57798205714B688cCEA0b5D99427c1B184F1](https://mumbai.polygonscan.com/address/0x531d57798205714B688cCEA0b5D99427c1B184F1)

### Network **Binance - Smart Chain — Testnet**

```
Network name: bnbt
RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
Chain Id: 97
Currency Symbol: BNB
Network scan:  https://testnet.bscscan.com
````

> Payment Contract deployed at [0x42da1D68EF9889E9AC71Ad323797B6F046588b4b](https://testnet.bscscan.com/address/0xFBFCdc423b57d9Ec13A9937b764d7A7f9D5D8EE8)

> Owner: [0x531d57798205714B688cCEA0b5D99427c1B184F1](https://testnet.bscscan.com/address/0x531d57798205714B688cCEA0b5D99427c1B184F1)
_____

## Mainnets 

> TODO

## Commands

**Building**

```
yarn install
```

```
yarn hardhat compile
```

**Tests**

```
yarn hardhat test
```

**Coverage check**

```
npx hardhat coverage
```

# Scritps Usage Sample

Script: ``deploy_payment_contract_binance_smartChain_testnet.ts``

```
yarn ts-node --files .\scripts\deploy_payment_contract_binance_smartChain_testnet.ts
```
