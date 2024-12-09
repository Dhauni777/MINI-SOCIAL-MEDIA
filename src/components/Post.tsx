import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaSave, FaComment } from 'react-icons/fa';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

interface PostProps {
  post: {
    id: string; // Firestore document ID
    imageUrl: string;
    username: string;
    likes: string[]; // Array of user IDs who liked the post
    savedBy: string[]; // Array of user IDs who saved the post
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const currentUser = auth.currentUser;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Check if the current user has liked or saved the post
  useEffect(() => {
    if (currentUser) {
      setLiked(post.likes.includes(currentUser.uid));
      setSaved(post.savedBy.includes(currentUser.uid));
    }
  }, [post.likes, post.savedBy, currentUser]);

  const handleLike = async () => {
    if (!currentUser) return alert('You need to log in to like posts!');
    const postRef = doc(db, 'posts', post.id);

    if (liked) {
      // Unlike the post
      await updateDoc(postRef, {
        likes: arrayRemove(currentUser.uid),
      });
    } else {
      // Like the post
      await updateDoc(postRef, {
        likes: arrayUnion(currentUser.uid),
      });
    }
    setLiked(!liked);
  };

  const handleSave = async () => {
    if (!currentUser) return alert('You need to log in to save posts!');
    const postRef = doc(db, 'posts', post.id);

    if (saved) {
      // Remove post from saved list
      await updateDoc(postRef, {
        savedBy: arrayRemove(currentUser.uid),
      });
    } else {
      // Add post to saved list
      await updateDoc(postRef, {
        savedBy: arrayUnion(currentUser.uid),
      });
    }
    setSaved(!saved);
  };

  const handleComment = () => {
    // Navigate to the comment section (not implemented here)
    alert('Comment functionality coming soon!');
  };

  return (
    <div className="post">
      <img src={post.imageUrl} alt="Post" className="post-image" />
      <p className="post-username">{post.username}</p>
      <div className="post-actions">
        <FaThumbsUp onClick={handleLike} color={liked ? 'blue' : 'black'} />
        <FaSave onClick={handleSave} color={saved ? 'blue' : 'black'} />
        <FaComment onClick={handleComment} />
      </div>
    </div>
  );
};

export default Post;
