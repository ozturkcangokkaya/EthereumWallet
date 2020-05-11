import {ethers} from 'ethers';

export const createWallet = async (walletName: string) => {
  const {Wallet, getDefaultProvider} = ethers;
  const defaultProvider = getDefaultProvider('rinkeby');
  const randomWallet = Wallet.createRandom();
  const newWallet = new Wallet(randomWallet.privateKey, defaultProvider);
  const walletBalance = await newWallet.getBalance();

  return {
    name: walletName,
    balance: ethers.utils.formatEther(walletBalance),
    ...newWallet
  };
};