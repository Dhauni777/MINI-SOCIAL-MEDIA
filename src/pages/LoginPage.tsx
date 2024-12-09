import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      setError('Google login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleGoogleLogin}>Sign In with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
