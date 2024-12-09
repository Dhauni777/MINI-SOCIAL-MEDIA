import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <FeedPage />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <FeedPage />} />
        <Route path="/my-posts" element={<ProtectedRoute user={user} children={undefined} />} />
        <Route path="/saved-posts" element={<ProtectedRoute user={user} children={undefined} />} />
      </Routes>
    </Router>
  );
}

export default App;
