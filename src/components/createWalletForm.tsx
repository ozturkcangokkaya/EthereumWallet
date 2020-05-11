import React, { useRef, useState, FC } from 'react';
import styled from 'styled-components';
import {createWallet} from '../helpers/createWallet';
import {WalletProps} from './wallet';

interface CreateWalletFormProps {
  wallets: WalletProps[];
  setWallets: Function;
}

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 28px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 500;
`;

const Input = styled.input<{hasError: boolean}>`
  width: 100%;
  height: 60px;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  background: #f0f0f0;
  border: 2px solid;
  border-color: ${props => props.hasError ? 'red' : '#f0f0f0'};
  transition: .2s;

  &:hover,
  &:focus {
    background: #fff;
  }
`;

const FormBottom = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormErrorMsg = styled.div`
  margin-right: 20px;
  color: red;
`;

const Button = styled.button`
  height: 60px;
  padding: 0 20px;
  margin-left: auto;
  background: #3a3985;
  color: #fff;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: .2s;
  flex-shrink: 0;

  &:hover,
  &:focus {
    background: #000;
  }
`;

const Form: FC<CreateWalletFormProps> = props => {
  const {wallets, setWallets} = props;
  const [inputErrorState, setInputErrorState] = useState(false);
  const [inputErrorMessageState, setInputErrorMessageState] = useState(false);
  const privateKeyInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const inputValue = privateKeyInputRef?.current?.value.trim();
    
    if(inputValue === '' || wallets.some(wallet => wallet.name === inputValue)){
      setInputErrorState(true);
      setInputErrorMessageState(true);
      return;
    }
    
    setInputErrorState(false);
    const newWallet = await createWallet(privateKeyInputRef!.current!.value);
    setWallets([newWallet, ...wallets])
    privateKeyInputRef!.current!.value = '';
  }

  return (
    <>
      <Title>Create New Wallet</Title>

      <StyledForm onSubmit={handleSubmit}>
        <Label htmlFor="walletName">Name your wallet</Label>
        <Input id="walletName" type="text" hasError={inputErrorState} ref={privateKeyInputRef} />

        <FormBottom>
          {inputErrorMessageState && (
            <FormErrorMsg>Wallet name should be unique / can not be left blank</FormErrorMsg>
          )}
          <Button>✔ Create Wallet</Button>
        </FormBottom>
      </StyledForm>
    </>
  )
}

export default Form;