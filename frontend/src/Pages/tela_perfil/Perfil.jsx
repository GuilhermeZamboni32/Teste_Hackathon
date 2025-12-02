import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nome: 'Visitante', email: '', peso: 0, largura_abdomen: 0 });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Aqui você faria um PUT/PATCH para o backend
    localStorage.setItem('user', JSON.stringify(user));
    alert('Medidas atualizadas com sucesso! Continue focado.');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="perfil-container">
    

      <div className="profile-header">
        <div className="avatar-large">😎</div>
        <div className="profile-name">{user.nome}</div>
        <div className="profile-email">{user.email}</div>
      </div>

      <h3 className="section-title">Minhas Medidas</h3>
      <form className="update-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label className="form-label">Peso Atual (kg)</label>
          <input 
            type="number" 
            className="form-input" 
            value={user.peso || ''} 
            onChange={(e) => setUser({...user, peso: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Largura Abdômen (cm)</label>
          <input 
            type="number" 
            className="form-input" 
            value={user.largura_abdomen || ''} 
            onChange={(e) => setUser({...user, largura_abdomen: e.target.value})}
          />
        </div>
        <button className="btn-save">Atualizar Dados</button>
      </form>

      <button className="btn-logout" onClick={handleLogout}>Sair da Conta</button>

      <nav className="bottom-nav">

    <div className="nav-item" onClick={() => navigate('/missao')}>
        <span className="nav-icon">⚔️</span> Missões
    </div>

    <div className="nav-item" onClick={() => navigate('/ranking')}>
        <span className="nav-icon">🏆</span> Ranking
    </div>

    <div className="nav-item" onClick={() => navigate('/conquista')}>
        <span className="nav-icon">🏅</span> Badges
    </div>

    <div className="nav-item" onClick={() => navigate('/nivel')}>
        <span className="nav-icon">📶</span> Níveis
    </div>

    <div className="nav-item" onClick={() => navigate('/rotina')}>
        <span className="nav-icon">📅</span> Rotina
    </div>

    <div className="nav-item" onClick={() => navigate('/ligas')}>
        <span className="nav-icon">🔥</span> Ligas
    </div>

    <div className="nav-item" onClick={() => navigate('/estatistica')}>
        <span className="nav-icon">📊</span> Estatísticas
    </div>

    <div className="nav-item" onClick={() => navigate('/configuracao')}>
        <span className="nav-icon">⚙️</span> Configurações
    </div>

    <div className="nav-item" onClick={() => navigate('/historico_missao')}>
        <span className="nav-icon">📘</span> Histórico Missões
    </div>

    <div className="nav-item" onClick={() => navigate('/historico_treino')}>
        <span className="nav-icon">🏋️</span> Histórico Treinos
    </div>

    <div className="nav-item" onClick={() => navigate('/progresso')}>
        <span className="nav-icon">📈</span> Progresso
    </div>

    <div className="nav-item active">
        <span className="nav-icon">👤</span> Perfil
    </div>
</nav>

    </div>
  );
}