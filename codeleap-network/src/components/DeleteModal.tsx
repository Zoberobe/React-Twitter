import styled from 'styled-components';


interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;    
  onConfirm: () => void;  
}


export const DeleteModal = ({ isOpen, onClose, onConfirm }: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <Title>Are you sure you want to delete this item?</Title>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DeleteButton onClick={onConfirm}>Delete</DeleteButton>
        </ButtonContainer>
      </ModalBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(119, 119, 119, 0.8); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 90%;
  max-width: 660px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const BaseButton = styled.button`
  padding: 8px 30px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid;
`;

const CancelButton = styled(BaseButton)`
  background-color: white;
  border-color: #999999;
  color: #000000;
`;

const DeleteButton = styled(BaseButton)`
  background-color: #FF5151; 
  border-color: #FF5151;
  color: white;
`;