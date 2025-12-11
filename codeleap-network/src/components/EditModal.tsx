import { useState, useEffect } from 'react';
import styled from 'styled-components';


interface PostData {
  id: number;
  title: string;
  content: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;

  onSave: (id: number, data: { title: string; content: string }) => void;
  initialData: PostData | null; 
}

export const EditModal = ({ isOpen, onClose, onSave, initialData }: EditModalProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    
    if (initialData) {
      onSave(initialData.id, { title, content });
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>Edit item</Title>
        <InputGroup>
          <Label>Title</Label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Hello world"
          />
        </InputGroup>
        <InputGroup>
          <Label>Content</Label>
          <TextArea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Content here"
          />
        </InputGroup>
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
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
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #777777;
  border-radius: 8px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #777777;
  border-radius: 8px;
  min-height: 74px;
  resize: none;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
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

const SaveButton = styled(BaseButton)`
  background-color: #47B960;
  border-color: #47B960;
  color: white;
`;