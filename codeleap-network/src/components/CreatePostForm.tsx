
import { useState } from 'react';
import styled from 'styled-components';
import { postsService } from '../services/postsService';

import { PrimaryButton, MainInput, MainTextArea } from '../styles/SharedStyles';

interface CreatePostFormProps {
  username: string;
  onPostCreated: () => void;
}

export const CreatePostForm = ({ username, onPostCreated }: CreatePostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = !title.trim() || !content.trim() || loading;

  const handleCreate = async () => {
    if (isButtonDisabled) return;
    setLoading(true);
    try {
      await postsService.create(username, title, content);
      setTitle('');
      setContent('');
      onPostCreated(); 
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreatePostBox>
      <BoxTitle>What's on your mind?</BoxTitle>
      
      <InputGroup>
        <InputLabel>Title</InputLabel>
        
        <MainInput 
          placeholder="Hello world" 
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <InputLabel>Content</InputLabel>
        
        <MainTextArea 
          placeholder="Content here" 
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </InputGroup>

      <ButtonContainer>
        
        <PrimaryButton 
          disabled={isButtonDisabled} 
          onClick={handleCreate}
        >
          {loading ? '...' : 'CREATE'}
        </PrimaryButton>
      </ButtonContainer>
    </CreatePostBox>
  );
};


const CreatePostBox = styled.div`
  border: 1px solid #999999;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 768px) { padding: 16px; gap: 16px; }
`;

const BoxTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #000000;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;