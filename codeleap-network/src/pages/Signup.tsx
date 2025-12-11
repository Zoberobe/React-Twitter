import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (username.trim()) {
      dispatch(login(username));
      navigate('/main'); 
    }
  };

  return (
    <Container>
      <Modal>
        <Title>Welcome to CodeLeap network!</Title>
        <Label>Please enter your username</Label>
        
        <Input 
          placeholder="John doe" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <ButtonContainer>
          <Button 
            disabled={!username.trim()} 
            onClick={handleSignup}
          >
            ENTER
          </Button>
        </ButtonContainer>
      </Modal>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #DDDDDD; /* Corrigido de var(--grey-bg) */
`;

const Modal = styled.div`
  background-color: #FFFFFF; /* Corrigido de var(--white) */
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #CCCCCC;
  
  width: 500px;
  max-width: 95%; 
  
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 22px;
  margin: 0 0 24px 0;
  color: #000000; /* Corrigido de var(--text-primary) */
  font-family: 'Roboto', sans-serif;
`;

const Label = styled.p`
  font-size: 16px;
  margin: 0 0 8px 0;
  font-weight: 400;
  color: #000000;
  font-family: 'Roboto', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px; 
  
  border: 1px solid #777;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box; /* Importante para não vazar a caixa */

  &::placeholder {
    color: #CCCCCC;
  }

  &:focus {
    border-color: #7695EC; /* Corrigido de var(--blue-primary) */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  /* Corrigido para as cores exatas */
  background-color: ${(props) => (props.disabled ? '#CCCCCC' : '#7695EC')};
  color: #FFFFFF;
  border: none;
  
  padding: 6px 30px;
  min-width: 110px; /* Garante tamanho mínimo igual ao design */
  
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;
  font-family: 'Roboto', sans-serif;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#CCCCCC' : '#5a7dd6')};
  }
`;