import express from 'express';
import cors from 'cors';
// CORREÇÃO IMPORTANTE:
// Estamos na pasta 'serviceUser', então voltamos (..) e entramos em 'serviceDatabase'
import pool from '../serviceDatabase/db.js'; 

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API FitUp rodando! 🚀');
});

// Rota de Cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha, data_nascimento, genero, peso, altura, largura_abdomen } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Verifica email
        const userCheck = await client.query('SELECT * FROM Usuarios WHERE Email = $1', [email]);
        if (userCheck.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Email já cadastrado.' });
        }

        // Insere Usuário
        const userQuery = `
            INSERT INTO Usuarios (Nome, Email, Senha, Data_Nascimento, Genero)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING ID_Usuario, Nome;
        `;
        const userResult = await client.query(userQuery, [nome, email, senha, data_nascimento, genero]);
        const newUserId = userResult.rows[0].id_usuario;

        // Insere Medidas
        const medidasQuery = `
            INSERT INTO Medidas (ID_Usuario, Peso, Altura, Largura_Abdomen)
            VALUES ($1, $2, $3, $4);
        `;
        await client.query(medidasQuery, [newUserId, peso, altura, largura_abdomen]);

        await client.query('COMMIT');
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: { id: newUserId } });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    } finally {
        client.release();
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const result = await pool.query('SELECT * FROM Usuarios WHERE Email = $1', [email]);
        if (result.rows.length === 0) return res.status(401).json({ message: 'Usuário não encontrado.' });

        const usuario = result.rows[0];
        if (usuario.senha !== senha) return res.status(401).json({ message: 'Senha incorreta.' });

        delete usuario.senha;
        res.json({ message: 'Login realizado!', user: usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});