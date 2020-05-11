import {ethers} from 'ethers';

const {getDefaultProvider} = ethers;
const defaultProvider = getDefaultProvider('rinkeby');

const updateWallets = (wallets:any) => {
  return wallets.map(async (wallet:any) => {
    const updatedBalance = await defaultProvider.getBalance(wallet.signingKey.address);
    
    return {
      ...wallet,
      balance: ethers.utils.formatEther(updatedBalance)
    };
  })
}

export default updateWallets;