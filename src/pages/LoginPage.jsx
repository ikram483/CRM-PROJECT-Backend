import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Stocker le token dans le localStorage
      localStorage.setItem('token', res.data.user.token);
      localStorage.setItem('role', res.data.user.role);

      // Rediriger selon le rôle
      if (res.data.user.role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/manager/dashboard');
      }
    } catch (err) {
      setError('Identifiants invalides ou erreur serveur');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="mb-3 text-center">Se connecter</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email :</label>
            <input type="email" className="form-control" required value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Mot de passe :</label>
            <input type="password" className="form-control" required value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Connexion</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
