import React, { useState } from 'react';
import './Cadastro.css';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Estado para guardar os dados digitados
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '', // O banco pede data, não apenas idade
    genero: '',
    altura: '',
    peso: '',
    largura_abdomen: ''
  });

  // Atualiza o estado quando o usuário digita
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Envia os dados para o servidor
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede a página de recarregar
    setLoading(true);

    try {
      // Prepara os dados (converte textos para números onde necessário)
      const payload = {
        ...formData,
        altura: parseFloat(formData.altura),
        peso: parseFloat(formData.peso),
        largura_abdomen: parseFloat(formData.largura_abdomen)
      };

      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Conta criada com sucesso! Faça login para começar.');
        navigate('/login');
      } else {
        alert('Erro ao cadastrar: ' + data.message);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-title">Criar Conta</h2>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <input 
          name="nome"
          className="cadastro-input" 
          placeholder="Nome Completo" 
          onChange={handleChange}
          required
        />
        <input 
          name="email"
          type="email"
          className="cadastro-input" 
          placeholder="Email" 
          onChange={handleChange}
          required
        />
        <input 
          name="senha"
          type="password" 
          className="cadastro-input" 
          placeholder="Senha" 
          onChange={handleChange}
          required
        />

        <div className="row">
          {/* Mudamos de Idade para Data de Nascimento para bater com o Banco */}
          <input 
            name="data_nascimento"
            type="date"
            className="cadastro-input" 
            placeholder="Data de Nascimento" 
            onChange={handleChange}
            required
          />
          
          <select 
            name="genero"
            className="cadastro-input" 
            onChange={handleChange}
            defaultValue=""
            required
          >
            <option value="" disabled>Gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="row">
          <input 
            name="altura"
            type="number"
            step="0.01"
            className="cadastro-input" 
            placeholder="Altura (ex: 1.75)" 
            onChange={handleChange}
            required
          />
          <input 
            name="peso"
            type="number"
            step="0.1"
            className="cadastro-input" 
            placeholder="Peso (kg)" 
            onChange={handleChange}
            required
          />
        </div>

        <input 
          name="largura_abdomen"
          type="number"
          step="0.1"
          className="cadastro-input" 
          placeholder="Largura do abdômen (cm)" 
          onChange={handleChange}
          required
        />

        <button type="submit" className="cadastro-btn" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <p className="cadastro-link">
        Já tem conta?
        <span onClick={() => navigate('/login')} className="cadastro-link-btn">
          Entrar
        </span>
      </p>
    </div>
  );
}