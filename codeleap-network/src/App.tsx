import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { Signup } from './pages/Signup';
import { MainScreen } from './pages/MainScreen';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Signup />} />
        
        <Route path="/main" element={<MainScreen />} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;