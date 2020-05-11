import React, {FC, useState, useEffect} from 'react';
import styled from 'styled-components';
import {createPortal} from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: Function;
  children: React.ReactNode;
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const ModalInner = styled.div`
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.8);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
`;

const ModalCloseButton = styled.button`
  width: 60px;
  height: 60px;
  background: #f0f0f0;
  font-size: 24px;
  border-radius: 50%;
  position: fixed;
  top: 20px;
  right: 20px;
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

const Modal: FC<ModalProps> = props => {
  const {children, isOpen, onClose} = props;
  const [modalState, setModalState] = useState(isOpen);

  useEffect(() => {
    setModalState(isOpen);
  }, [isOpen])

  if(!modalState)
    return null;

  const handleClose = () => {
    setModalState(false)
    onClose();
  }

  const modalContent = (
    <ModalContainer>
      <ModalInner>
        {children}
      </ModalInner>

      <ModalCloseButton onClick={() => handleClose()}>
        <span role='img' aria-label='close modal'>
          ✕
        </span>
      </ModalCloseButton>
      <ModalBackdrop onClick={() => handleClose()} />
    </ModalContainer>
  )

  return createPortal(modalContent, document.body)
}

export default Modal;