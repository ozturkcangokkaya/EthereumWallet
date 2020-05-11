import {ethers} from 'ethers';

const {Wallet, getDefaultProvider} = ethers;
const defaultProvider = getDefaultProvider('rinkeby');

const transaction = (privateKey: string, amount: string, receiverAddress: string) => {
  const wallet = new Wallet(privateKey, defaultProvider);

  return wallet.sendTransaction({
    to: receiverAddress,
    value: ethers.utils.parseEther(amount)
  })
}

export default transaction;
