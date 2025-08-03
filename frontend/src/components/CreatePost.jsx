import React, { useState } from 'react';
import api, { showSuccess } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      const response = await api.post('/posts', {
        content: content.trim()
      });
      
      onPostCreated(response.data);
      setContent('');
      setFocused(false);
      showSuccess(response.data.message);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterCountClass = () => {
    const percentage = (content.length / 1000) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-gray-500';
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#0a66c2', '#7b68ee', '#20b2aa', '#ff6347', 
      '#32cd32', '#ff69b4', '#daa520', '#9370db'
    ];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Welcome Header inside Create Post */}
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
          style={{ backgroundColor: getAvatarColor(user?.name) }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-sm text-gray-600">What's on your mind?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="flex gap-2 sm:gap-3">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0"
            style={{ backgroundColor: getAvatarColor(user?.name) }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div 
              className={`relative ${focused ? 'z-10' : ''}`}
              onClick={() => setFocused(true)}
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={(e) => {
                  // Only blur if clicking outside the form area
                  if (!e.currentTarget.closest('form').contains(e.relatedTarget)) {
                    setFocused(false);
                  }
                }}
                placeholder="Start a post..."
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg resize-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                rows={focused ? 4 : 2}
                maxLength="1000"
              />
            </div>
            
            {/* Character counter */}
            {content.length > 0 && (
              <div className={`text-xs mt-2 text-right ${getCharacterCountClass()}`}>
                {content.length}/1000 characters
              </div>
            )}
          </div>
        </div>
        
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 pt-2">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Media buttons */}
            <button
              type="button"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              title="Add photo"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden xs:block">Photo</span>
            </button>
            
            <button
              type="button"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              title="Add video"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden xs:block">Video</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
              title="Add document"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden xs:block">Doc</span>
            </button>
          </div>
          
          {/* Post Button - Full width on mobile */}
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="w-full sm:w-auto bg-linkedin text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting...
              </span>
            ) : (
              'Post'
            )}
          </button>
        </div>

        {/* Tips for new users */}
        {focused && content.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-xs sm:text-sm">
                <p className="font-medium text-blue-800 mb-1">Share an update</p>
                <p className="text-blue-700">What's new in your professional world? Share insights, achievements, or industry thoughts.</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;