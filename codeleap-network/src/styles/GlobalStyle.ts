import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --blue-primary: #7695EC;
    --red-danger: #FF5151;
    --green-success: #47B960;
    --grey-bg: #DDDDDD;
    --white: #FFFFFF;
    --text-primary: #000000;
    --text-secondary: #777777;
    --border-color: #999999;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html {
    /* Faz a rolagem da página ser suave */
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--grey-bg);
    min-height: 100vh;
    /* Removemos o display: flex do body pois pode quebrar layouts longos, 
       deixe o Container principal cuidar da centralização */
  }
  
  input, button, textarea {
    font-family: 'Roboto', sans-serif;
  }

  /* --- BARRA DE ROLAGEM PERSONALIZADA (Fica muito bonito) --- */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
 
  ::-webkit-scrollbar-thumb {
    background: var(--blue-primary); 
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #5a7dd6; 
  }
`;