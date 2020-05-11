import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './App.css';
import Modal from './components/modal';
import Form from './components/createWalletForm';
import Wallet from './components/wallet';
import useLocalStorage from './hooks/useLocalStorage'
import updateWallets from './helpers/updateWallets';
import TransactionForm from './components/transactionForm';
import Section from './components/section';

const Wrapper = styled.main`
  display: flex;
  height: 100vh;
  padding: 40px 20px;
`;

const WalletsWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const ActionButton = styled.button`
  width: 60px;
  height: 60px;
  background: #f0f0f0;
  font-size: 24px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #000;
    color: #fff;
  }
`;

const CreateWalletButton = styled(ActionButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const ReloadButton = styled(ActionButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const App = () => {
  const RELOAD_INTERVAL = 30; // seconds
  const [modalState, setModalState] = useState(false);
  const [wallets, setWallets] = useLocalStorage('wallets', []);

  const handleReload = async () => {
    const updatedWallets = await Promise.all(updateWallets(wallets));
    setWallets(updatedWallets);
  }

  useEffect(() => {
    const reloadInterval = setInterval(handleReload, RELOAD_INTERVAL * 1000)

    return () => clearInterval(reloadInterval)
  })

  return (
    <Wrapper>
      <Section title='Wallets'>
        <WalletsWrapper>
          {wallets.map((wallet:any) => (
            <Wallet
              key={wallet.signingKey.address}
              address={wallet.signingKey.address}
              name={wallet.name}
              balance={wallet.balance}
            />
          ))}
        </WalletsWrapper>

        <CreateWalletButton onClick={() => setModalState(!modalState)}>
          <span role='img' aria-label='add new wallet'>
            ＋
          </span>
        </CreateWalletButton>

        <Modal isOpen={modalState} onClose={() => setModalState(false)}>
          <Form wallets={wallets} setWallets={setWallets} />
        </Modal>
      </Section>

      <Section title='Send ETH'>
        <TransactionForm wallets={wallets} reloadWallets={handleReload} />
      </Section>

      <ReloadButton onClick={handleReload}>⟳</ReloadButton>
    </Wrapper>
  );
};

export default App;
