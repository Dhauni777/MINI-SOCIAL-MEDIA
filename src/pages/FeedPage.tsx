import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import Post from '../components/Post';

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      setPosts(querySnapshot.docs.map(doc => doc.data()));
    };

    getPosts();
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedPage;
