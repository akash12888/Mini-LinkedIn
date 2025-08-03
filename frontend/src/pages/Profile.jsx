import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import PostCard from '../components/PostCard';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Separate error states to avoid mixing profile and posts errors
  const [profileError, setProfileError] = useState('');
  const [postsError, setPostsError] = useState(''); 

  useEffect(() => {
    setLoading(true);
    fetchUserProfile();
    fetchUserPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response.data.error) {
        setProfileError(response.data.message || 'Failed to load user profile');
        setUser(null);
      } else {
        const userData = response.data.data || response.data.user || response.data;
        setUser(userData);
        setProfileError('');
      }
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to load user profile');
      setUser(null);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await api.get(`/posts/user/${userId}`);
      const postsData = response.data.data || response.data;
      setPosts(Array.isArray(postsData) ? postsData : []);
      setPostsError('');
    } catch (err) {
      setPostsError(err.response?.data?.message || 'Failed to load posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#0a66c2', '#004182', '#0073b1', '#005983',
      '#3296f5', '#003d66', '#004f9f', '#2e77bb',
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="text-center py-16 max-w-md mx-auto px-4">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M6.938 4h13.856c1.54 0 2.502 1.667 1.732 2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Not Found</h3>
          <p className="text-gray-600 px-4">{profileError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-4 sm:py-8 px-3 sm:px-4 lg:px-8 space-y-4 sm:space-y-8">
        {/* Profile Header */}
        {user && (
          <section className="relative rounded-lg shadow-sm bg-white overflow-hidden border border-gray-200">
            {/* Background Cover */}
            <div
              className="h-32 sm:h-44 md:h-52 lg:h-56 bg-gradient-to-b from-blue-100 via-blue-50 to-white relative"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-transparent to-transparent opacity-20 pointer-events-none"></div>
            </div>

            {/* Avatar and Info */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start px-4 sm:px-6 pb-6 pt-0 relative -mt-12 sm:-mt-20 md:-mt-24 lg:-mt-28">
              {/* Avatar */}
              <div
                className="rounded-full border-4 border-white flex items-center justify-center text-white font-bold w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 text-3xl sm:text-4xl md:text-6xl"
                style={{ backgroundColor: getAvatarColor(user.name) }}
              >
                {user.name?.charAt(0).toUpperCase() || ''}
              </div>

              {/* User Info */}
              <div className="mt-4 lg:mt-0 lg:ml-6 xl:ml-8 text-center lg:text-left flex-1 min-w-0">
                <h1
                  className="font-semibold text-2xl sm:text-3xl md:text-4xl text-gray-900 truncate"
                  title={user.name}
                >
                  {user.name}
                </h1>
                <p
                  className="mt-1 text-gray-600 text-sm sm:text-base md:text-lg truncate"
                  title={user.email}
                >
                  {user.email}
                </p>
                {user.bio && (
                  <p className="mt-3 max-w-xl p-3 sm:p-2 rounded-lg break-words whitespace-pre-line text-sm sm:text-base">
                    {user.bio}
                  </p>
                )}

                {/* Stats */}
                <div className="mt-4 sm:mt-6 flex justify-center lg:justify-start space-x-4 sm:space-x-8 text-gray-700 text-xs sm:text-sm md:text-base font-medium">
                  <div>
                    <span className="font-semibold text-gray-900">{posts.length}</span>{' '}
                    {posts.length === 1 ? 'Post' : 'Posts'}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {new Date(user.createdAt).getFullYear()}
                    </span>{' '}
                    Joined
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">0</span> Connections
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 sm:mt-6 flex justify-center lg:justify-start flex-wrap gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  >
                    Connect
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 text-gray-700 px-4 sm:px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  >
                    Message
                  </button>
                  <button
                    type="button"
                    className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    aria-label="More options"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Posts Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Activity</h2>
            <span className="text-gray-600 text-sm sm:text-base">
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 sm:py-20 text-gray-500">
              <svg
                className="mx-auto mb-4 w-12 h-12 sm:w-16 sm:h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <p className="text-sm sm:text-base">No posts yet. Start sharing your thoughts and connect with your network.</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* Bottom padding */}
        <div className="h-4 sm:h-8"></div>
      </div>
    </div>
  );
};

export default Profile;
