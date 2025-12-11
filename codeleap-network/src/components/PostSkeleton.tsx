import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const SkeletonContainer = styled.div`
  width: 100%;
  border: 1px solid #E0E0E0;
  border-radius: 16px;
  padding: 24px;
  background: #FFF;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GrayBlock = styled.div<{ width?: string; height?: string }>`
  background-color: #E0E0E0;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  border-radius: 4px;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PostSkeleton = () => {
  return (
    <SkeletonContainer>
      <HeaderRow>
        <GrayBlock width="60%" height="24px" />
      </HeaderRow>
      <GrayBlock width="30%" height="16px" />
      <GrayBlock width="100%" height="80px" />
    </SkeletonContainer>
  );
};