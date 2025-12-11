import styled from 'styled-components';
import { FaTrash, FaEdit, FaEllipsisV, FaHeart, FaRegHeart } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { postsService } from '../services/postsService';

interface PostCardProps {
  post: IPost; 
  currentUser: string;
  onDelete: () => void;
  onEdit: () => void;
}

export interface IPost {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
  likes_count: number; 
  is_liked: boolean;   
}

const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { 
      addSuffix: true, 
     
    });
  };


export const PostCard = ({ post, currentUser, onDelete, onEdit }: PostCardProps) => {
  const isOwner = currentUser === post.username;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [liked, setLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes_count); 
  const [isAnimating, setIsAnimating] = useState(false);          
  const handleLike = async () => {
    if (isAnimating) return; 
    setIsAnimating(true);

 
    const previousLiked = liked;
    const previousCount = likesCount;
    
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);

    try {

      const data = await postsService.toggleLike(post.id, currentUser);      

      setLiked(data.liked);
      setLikesCount(data.likes_count);
    } catch (error) {
      console.error("Erro ao dar like", error);

      setLiked(previousLiked);
      setLikesCount(previousCount);
    } finally {
        setIsAnimating(false);
    }
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.4, ease: "easeOut" }} 
    >
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        {isOwner && (
          <MenuWrapper>
            
            <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
               <FaEllipsisV />
            </IconButton>

            
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                      
                        <InvisibleOverlay onClick={() => setIsMenuOpen(false)} />
                        
                        <Dropdown
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                        >
                            <DropdownItem onClick={() => { onEdit(); setIsMenuOpen(false); }}>
                                <FaEdit /> Edit
                            </DropdownItem>
                            <DropdownItem isDelete onClick={() => { onDelete(); setIsMenuOpen(false); }}>
                                <FaTrash /> Delete
                            </DropdownItem>
                        </Dropdown>
                    </>
                )}
            </AnimatePresence>
          </MenuWrapper>
        )}
      </CardHeader>
      
      <CardBody>
        <MetaInfo>
          <Username>@{post.username}</Username>
          <Time>{formatDate(post.created_datetime)}</Time> 
        </MetaInfo>
        <ContentText>{post.content}</ContentText>
        <ActionsBar>
           <LikeButton 
              onClick={handleLike} 
              isLiked={liked}
              whileTap={{ scale: 0.8 }} 
           >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
           </LikeButton>
        </ActionsBar>
      </CardBody>
    </CardContainer>
  );
};


const CardContainer = styled(motion.article)`
  width: 100%;
  background-color: #FFFFFF;
  border: 1px solid #999999;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

const CardHeader = styled.div`
  width: 100%;
  background-color: #7695EC;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 70px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  @media (max-width: 600px) {
    height: 60px;
    padding: 16px;
  }
`;

const CardTitle = styled.h3`
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%; 
  
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const MenuWrapper = styled.div`
  position: relative; 
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 20px;
  padding: 8px; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 35px; 
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px;
  z-index: 10;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DropdownItem = styled.button<{ isDelete?: boolean }>`
  background: transparent;
  border: none;
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  color: ${props => props.isDelete ? '#FF5151' : '#000000'}; 
  transition: background 0.2s;

  &:hover {
    background-color: #F0F2F5;
  }
`;

const InvisibleOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9; 
  background: transparent;
`;

const CardBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
 
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;


  @media (max-width: 600px) {
    padding: 16px;
    gap: 12px;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #777777;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;


  @media (max-width: 600px) {
    font-size: 14px;
    flex-direction: column; 
    align-items: flex-start; 
    gap: 4px; 
  }
`;

const Username = styled.span`
  font-weight: 700;
`;

const Time = styled.span`
  font-weight: 400;
`;

const ContentText = styled.p`
  color: #000000;
  font-size: 18px;
  line-height: 1.5;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  white-space: pre-wrap; 
  word-break: break-word;


  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ActionsBar = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const LikeButton = styled(motion.button)<{ isLiked: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  

  color: ${props => props.isLiked ? '#FF5151' : '#777777'};
  
  transition: color 0.2s;

  svg {
    font-size: 20px;
  }
`;