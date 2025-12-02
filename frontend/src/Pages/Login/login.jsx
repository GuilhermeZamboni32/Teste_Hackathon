import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Erro ao fazer login.');
        setLoading(false);
        return;
      }

      // Salva dados do usuário
      localStorage.setItem('usuario', JSON.stringify(data.user));

      alert('Login realizado com sucesso!');

      // 👉 REDIRECIONA PARA PERFIL
      navigate('/perfil');

    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Entrar</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          className="login-input"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="senha"
          type="password"
          className="login-input"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        <button className="login-btn" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="login-link">
        Não tem conta?
        <span onClick={() => navigate('/cadastro')} className="login-link-btn">
          Criar conta
        </span>
      </p>
    </div>
  );
}
