import React, { useState, useEffect } from 'react';
import api, { showError } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      const data = response.data.data || response.data;
      setPosts(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch posts';
      showError(msg);
      setError(msg);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    const postData = newPost.data || newPost;
    setPosts([postData, ...posts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-2">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-2">
      <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Create Post Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-4">
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </div>
          </div>
        )}

        {/* Posts Section */}
        <section className="space-y-4 sm:space-y-6">
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                No posts yet. Be the first to share something!
              </p>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </section>

        {/* Bottom padding for mobile */}
      </main>
    </div>
 
  );
};

export default Home;