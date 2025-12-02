import { createBrowserRouter } from "react-router-dom";

// === Telas Principais ===
import Home from "../Pages/Home/Home";
import Cadastro from "../Pages/Cadastro/cadastro"; 
import Login from "../Pages/Login/Login";

// === Telas do App (Dashboard) ===
import Perfil from "../Pages/tela_perfil/Perfil";
import Conquista from "../Pages/conquistas/Conquista";
import Ranking from "../Pages/rankns/Ranking";
import Missao from "../Pages/missoes/Missao";
import Nivel from "../Pages/niveis/Nivel";
import Rotina from "../Pages/rotinas_semanais/Rotina";
import Liga from "../Pages/ligas/Liga"; 
import Estatistica from "../Pages/estatisticas/Estatistica";

// === Telas Extras (Adicionadas conforme solicitado) ===
import Configuracao from "../Pages/configuracoes/Configuracao";
import Historico_Missao from "../Pages/historico_missoes/Historico_Missao";
import Historico_Treino from "../Pages/historico_treinos/Historico_Treino";
import Progresso from "../Pages/progressos/Progresso";


const router = createBrowserRouter([
    // --- Fluxo Inicial ---
    { path: "/", element: <Home /> },
    { path: "/cadastro", element: <Cadastro /> },
    { path: "/login", element: <Login /> },

    // --- Fluxo do Usuário (Dashboard) ---
    { path: "/perfil", element: <Perfil /> },
    { path: "/conquista", element: <Conquista /> },
    { path: "/ranking", element: <Ranking /> },
    { path: "/missao", element: <Missao /> },
    { path: "/nivel", element: <Nivel /> },
    { path: "/rotina", element: <Rotina /> },
    { path: "/ligas", element: <Liga /> }, 
    { path: "/estatistica", element: <Estatistica /> },

    // --- Novas Rotas Adicionadas ---
    { path: "/configuracao", element: <Configuracao /> },
    { path: "/historico_missao", element: <Historico_Missao /> },
    { path: "/historico_treino", element: <Historico_Treino /> },
    { path: "/progresso", element: <Progresso /> },
   
]);

export default router;