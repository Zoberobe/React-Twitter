import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';  
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle'; 
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; 
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle/>
    <Provider store={store}> 
    <PersistGate loading={null} persistor={persistor}></PersistGate>
    <Toaster 
            richColors 
            position="bottom-center" 
            
            
            offset="40px" 
            
            toastOptions={{
                style: {
                    padding: '16px',
                    fontSize: '16px',    
                    width: '100%',       
                    maxWidth: '500px',   
                    borderRadius: '12px', 
                    textAlign: 'center',
                },
            }}
        />
      <App />
    </Provider>
  </React.StrictMode>,
);