import { useState, useEffect, useCallback } from 'react';
import { postsService } from '../services/postsService';
import { type IPost } from '../components/PostCard';

export const usePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = useCallback(async (search = '') => {
    setLoading(true);
    try {
      const data = await postsService.getAll(undefined, search);
      setPosts(data.results); 
      setNextPageUrl(data.next);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextPageUrl) return;
    const data = await postsService.getAll(nextPageUrl);
    setPosts(prev => [...prev, ...data.results]);
    setNextPageUrl(data.next);
  }, [nextPageUrl]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPosts(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, fetchPosts]);

  return { 
    posts, 
    loading, 
    fetchPosts: () => fetchPosts(searchTerm), 
    loadMore, 
    hasMore: !!nextPageUrl,
    searchTerm,       
    setSearchTerm    
  };
};