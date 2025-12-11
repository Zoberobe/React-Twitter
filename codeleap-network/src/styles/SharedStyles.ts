// src/styles/SharedStyles.ts
import styled from 'styled-components';

// Botão padrão (Azul/Cinza)
export const PrimaryButton = styled.button<{ disabled?: boolean; color?: string }>`
  background-color: ${(props) => (props.disabled ? '#CCCCCC' : props.color || 'var(--blue-primary)')};
  color: var(--white);
  border: none;
  padding: 8px 30px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  text-transform: uppercase;
  transition: filter 0.2s;
  width: auto;

  &:hover {
    filter: ${(props) => (props.disabled ? 'none' : 'brightness(0.9)')};
  }

  @media (max-width: 500px) {
    width: 100%;
    padding: 12px 0;
  }
`;

// Input Padrão
export const MainInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--text-secondary);
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
  
  &:focus {
    border-color: var(--blue-primary);
  }
  
  &::placeholder { color: #CCCCCC; }
`;

// TextArea Padrão
export const MainTextArea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--text-secondary);
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  min-height: 74px;
  resize: none;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;

  &:focus {
    border-color: var(--blue-primary);
  }

  &::placeholder { color: #CCCCCC; }
`;