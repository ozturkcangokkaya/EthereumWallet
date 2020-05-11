import React, {FC, useState, useRef} from 'react';
import styled from 'styled-components';
import transaction from '../helpers/transaction';

interface TransactionFormProps {
  wallets: any;
  reloadWallets: Function;
}

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 500;
`;

const Selectbox = styled.select<{hasError: boolean}>`
  height: 60px;
  background: #fff;
  padding: 10px;
  border: 2px solid;
  border-color: ${props => props.hasError ? 'red' : '#f0f0f0'};
  font-size: 16px;
`;

const Input = styled.input<{hasError: boolean}>`
  width: 100%;
  height: 60px;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  border: 2px solid;
  border-color: ${props => props.hasError ? 'red' : '#f0f0f0'};
`;

const FormBottom = styled.div`
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

const TransactionForm: FC<TransactionFormProps> = props => {
  const {wallets, reloadWallets} = props;
  const [amountErrorState, setAmountErrorState] = useState(false);
  const [senderAndReceiverErrorState, setSenderAndReceiverErrorState] = useState(false);
  const [fundsInsufficientErrorState, setFundsInsufficientErrorState] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const senderInputRef = useRef<HTMLSelectElement>(null);
  const receiverInputRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const sender = wallets.find((wallet:any) => wallet.name === senderInputRef!.current!.value)
    const receiver = wallets.find((wallet:any) => wallet.name === receiverInputRef!.current!.value)
    const amount = amountInputRef!.current!.value;
    const amountIsInvalid = amountInputRef?.current?.value === '0';
    const senderAndReceiverAreSame = senderInputRef?.current?.value === receiverInputRef?.current?.value;
    const isFundsInsufficient = sender.balance < amount;
    
    // Set input errors
    amountIsInvalid ? setAmountErrorState(true) : setAmountErrorState(false)
    senderAndReceiverAreSame ? setSenderAndReceiverErrorState(true) : setSenderAndReceiverErrorState(false)
    isFundsInsufficient ? setFundsInsufficientErrorState(true) : setFundsInsufficientErrorState(false)

    if(!amountIsInvalid && !senderAndReceiverAreSame){
      await transaction(sender.signingKey.privateKey, amount, receiver.signingKey.address);
      
      // TODO: Find a way to reload wallets when transaction takes places on ethereum blockchain.
      reloadWallets()
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>From</Label>
        <Selectbox ref={senderInputRef} hasError={senderAndReceiverErrorState}>
          {wallets.map((wallet:any) => (
            <option key={wallet.name} value={wallet.name}>{wallet.name}</option>
          ))}
        </Selectbox>
      </Field>

      <Field>
        <Label>To</Label>
        <Selectbox ref={receiverInputRef} hasError={senderAndReceiverErrorState}>
          {wallets.map((wallet:any) => (
            <option key={wallet.name} value={wallet.name}>{wallet.name}</option>
          ))}
        </Selectbox>
      </Field>

      <Field>
        <Label>Amount</Label>
        <Input
          type='number'
          min={0}
          step='any'
          defaultValue={0}
          hasError={amountErrorState ||fundsInsufficientErrorState}
          ref={amountInputRef}
        />
      </Field>
      
      <FormBottom>
        {(amountErrorState || senderAndReceiverErrorState ||fundsInsufficientErrorState) && (
          <div>
            {amountErrorState && (
              <FormErrorMsg>- Amount should be greater than 0</FormErrorMsg>
            )}
            {senderAndReceiverErrorState && (
              <FormErrorMsg>- Sender and receiver addresses cannot be the same</FormErrorMsg>
            )}
            {fundsInsufficientErrorState && (
              <FormErrorMsg>- Insufficient funds</FormErrorMsg>
            )}
          </div>
        )}
        <Button>Start Transaction</Button>
      </FormBottom>
    </Form>
  )
}

export default TransactionForm;