import React, {FC} from 'react';
import styled from 'styled-components';

export interface WalletProps {
  name: string;
  balance: number;
  address: string;
}

const WalletWrapper = styled.div`
  padding: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &:not(:first-child){
    margin-top: 10px;
  }
`;

const WalletLeft = styled.div`
  margin-right: 20px;
`;

const WalletName = styled.div`
  font-size: 20px;
`;

const WalletAddress = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #807c7c;
`;

const WalletBalance = styled.div`
  min-width: 100px;
  padding: 10px;
  border-radius: 10px;
  background: #E6FFFA;
  color: #234e52;
  text-align: center;
`;

const Wallet: FC<WalletProps> = props => {
  const {name, balance, address} = props;

  return (
    <WalletWrapper>
      <WalletLeft>
        <WalletName>{name}</WalletName>
        <WalletAddress>{address}</WalletAddress>
      </WalletLeft>
      <WalletBalance>{balance || 0} ETH</WalletBalance>
    </WalletWrapper>
  )
}

export default Wallet;