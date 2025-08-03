import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [post.content]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes <= 1 ? 'now' : `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else if (diffInHours < 168) {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#0a66c2', '#7b68ee', '#20b2aa', '#ff6347',
      '#32cd32', '#ff69b4', '#daa520', '#9370db'
    ];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  if (!post || !post.author) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Link
            to={`/profile/${post.author._id}`}
            className="flex items-center gap-2 sm:gap-3 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors flex-1 min-w-0"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0"
              style={{ backgroundColor: getAvatarColor(post.author.name) }}
            >
              {post.author.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {post.author.name}
              </h3>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                <span className="truncate">{post.author.email}</span>
                <span>•</span>
                <span className="whitespace-nowrap">{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Post Content */}
        <div
          ref={contentRef}
          className={`text-gray-800 leading-relaxed mb-2 whitespace-pre-wrap text-sm sm:text-base break-words transition-all duration-300 ${
            showFull ? '' : 'line-clamp-5'
          }`}
        >
          {post.content}
        </div>

        {/* Show More / Less Button */}
        {isOverflowing && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-blue-600 text-sm font-medium focus:outline-none"
          >
            {showFull ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Like / Share / Comment section */}
      <div className="border-t border-gray-100 px-4 sm:px-6 py-3">
        <div className="flex items-center justify-center sm:justify-evenly gap-2 sm:gap-4">
          <button
            onClick={handleLike}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              liked ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden xs:block">{liked ? 'Liked' : 'Like'}</span>
            {likeCount > 0 && <span className="text-xs">({likeCount})</span>}
          </button>

          {/* Comment */}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="hidden xs:block">Comment</span>
          </button>

          {/* Share */}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="hidden sm:block">Share</span>
          </button>

          {/* Send */}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="hidden sm:block">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
