import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">

      {/* Cabeçalho */}
      <header className="home-header">
        <h1 className="logo">FIT<span>UP</span></h1>
      </header>

      {/* Conteúdo principal */}
      <main className="home-main">
        <h2 className="home-title">
          Construa hábitos saudáveis<br />de forma divertida
        </h2>

        <p className="home-subtitle">
          Evolua diariamente com desafios, rankings e progresso gamificado.  
        </p>

        <div className="home-image">
          <img src="/logos/fitness.png" alt="fitness ilustration" />
        </div>

        <div className="button-area">
          <Link to="/login" className="btn-primary">Entrar</Link>
          <Link to="/cadastro" className="btn-secondary">
            Criar Conta
          </Link>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="home-footer">
        <p>© 2025 FitUp — Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}
