import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { postsService } from '../services/postsService';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { type IPost } from '../components/PostCard';

import { usePosts } from '../hooks/usePosts';
import { CreatePostForm } from '../components/CreatePostForm';
import { AppHeader } from '../components/AppHeader';
import { PostCard } from '../components/PostCard'; 
import { DeleteModal } from '../components/DeleteModal';
import { EditModal } from '../components/EditModal';
import { PostSkeleton } from '../components/PostSkeleton'; 
import { MainInput } from '../styles/SharedStyles'; 
import { FaSearch } from 'react-icons/fa'; 


import { toast } from 'sonner'; 
import { useInView } from 'react-intersection-observer'; 

interface RootState {
  user: {
    username: string;
  };
}

export const MainScreen = () => {
  const { posts, loading, fetchPosts, loadMore, hasMore, searchTerm, setSearchTerm } = usePosts();  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);


  const { ref, inView } = useInView({
    threshold: 0.1, 
  });

  const currentUser = useSelector((state: RootState) => state.user.username);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/');
  }, [currentUser, navigate]);


  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);


  const handlePostCreated = () => {
    fetchPosts();
    toast.success('Post created successfully!'); 
  };

  const handleDeleteClick = (post: IPost) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedPost) return;
    try {
        await postsService.delete(selectedPost.id);
        fetchPosts(); 
        setDeleteModalOpen(false); 
        setSelectedPost(null);
        toast.success('Post deleted successfully!'); 
    } catch (error) {
        console.error("Erro ao deletar", error);
        toast.error('Could not delete post.');
    }
  };

  const handleEditClick = (post: IPost) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const confirmEdit = async (id: number, updatedData: { title: string; content: string }) => {
    try {
        await postsService.update(id, updatedData);
        fetchPosts();
        setEditModalOpen(false);
        setSelectedPost(null);

        toast.success('Post updated successfully!');
    } catch (error) {
        console.error("Erro ao editar", error);
        toast.error('Could not update post.');
    }
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
    setEditModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <Container>
      <CentralColumn>
        <AppHeader />

        <Content>
          <SearchWrapper>
             <FaSearch className="search-icon" />
             <StyledSearchInput 
                placeholder="Search posts by title, content or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </SearchWrapper>
          <CreatePostForm 
              username={currentUser} 
              onPostCreated={handlePostCreated} 
          />

          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onDelete={() => handleDeleteClick(post)}
              onEdit={() => handleEditClick(post)}
            />
          ))}

          {loading && (
             <>
               <PostSkeleton />
               <PostSkeleton />
             </>
          )}

          {hasMore && !loading && (
            <div ref={ref} style={{ height: '20px', background: 'transparent' }} />
          )}

        </Content>
      </CentralColumn>
      
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />

      <EditModal 
        isOpen={isEditModalOpen}
        onClose={closeModal}
        onSave={confirmEdit}
        initialData={selectedPost}
      />

    </Container>
  );
};



const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #DDDDDD;
  display: flex;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
`;

const CentralColumn = styled.div`
  width: 70vw;            
  max-width: 1200px;   
  display: flex;
  flex-direction: column;
  background-color: transparent;
  height: 100%; 
`;

const Content = styled.main`
  width: 100%;
  background-color: #FFFFFF;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1; 
  padding-bottom: 40px; 
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SearchWrapper = styled.div`
  margin-bottom: 24px;
  position: relative; 
  display: flex;
  align-items: center;
  width: 100%;

  .search-icon {
    position: absolute;
    left: 14px;     
    color: #777777;  
    font-size: 16px; 
    z-index: 1;      
    pointer-events: none; 
  }
`;


const StyledSearchInput = styled(MainInput)`
  padding-left: 40px; 
`;