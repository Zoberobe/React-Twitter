// src/components/AppHeader.tsx
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';

interface RootState {
  user: {
    username: string;
  };
}

export const AppHeader = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Header>
      <HeaderContent>
        <Logo>CodeLeap Network</Logo>
        <UserInfo>
          <LogoutText>Hi, {username}</LogoutText>
          <LogoutButton onClick={handleLogout} aria-label="Logout">
            <span className="desktop-text">Logout</span>
            <svg className="mobile-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </LogoutButton>
        </UserInfo>
      </HeaderContent>
    </Header>
  );
};


const Header = styled.header`
  width: 100%;
  background-color: #7695EC;
  padding: 27px 37px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  @media (max-width: 400px) {
    font-size: 18px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

const LogoutText = styled.span`
  color: #FFFFFF;
  font-size: 16px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid #FFFFFF;
  color: #FFFFFF;
  padding: 8px 30px; 
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  .mobile-icon { display: none; }
  .desktop-text { display: block; }

  &:hover {
    background-color: #FFFFFF;
    color: #7695EC;
  }

  @media (max-width: 600px) {
    border: none;      
    padding: 8px;      
    width: auto;        
    
    .desktop-text { display: none; }
    .mobile-icon { display: block; }
    
    &:hover {
      background-color: transparent;
      opacity: 0.8;
      color: #FFFFFF; 
    }
  }
`;