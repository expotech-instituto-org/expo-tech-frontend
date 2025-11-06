import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

// Em produção, usa a variável do servidor. Em dev, pode usar NEXT_PUBLIC
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'https://expo-tech-backend.onrender.com/api/';

// Configuração para aceitar certificados auto-assinados apenas em desenvolvimento
const httpsAgent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV === 'production',
});

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body;

    // Verifica o tipo de conteúdo da requisição
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // Converte form-urlencoded para JSON
      const formData = await request.text();
      const params = new URLSearchParams(formData);
      body = Object.fromEntries(params.entries());
    } else {
      // Tenta ler como texto e parsear
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        // Se não for JSON, tenta como URLSearchParams
        const params = new URLSearchParams(text);
        body = Object.fromEntries(params.entries());
      }
    }

    // Valida se os campos obrigatórios existem
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: 'Username e password são obrigatórios' },
        { status: 400 }
      );
    }

    // Converte o body para URLSearchParams (formato que o backend espera)
    const params = new URLSearchParams();
    params.append('username', body.username);
    params.append('password', body.password);

    // Faz a requisição para o backend usando axios
    const response = await axios.post(`${BACKEND_URL}users/login`, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      httpsAgent: httpsAgent,
      validateStatus: () => true, // Aceita qualquer status code
    });

    console.log('Resposta do backend - Status:', response.status);

    // Retorna a resposta do backend com o mesmo status
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Erro ao fazer proxy para /users/login:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}

