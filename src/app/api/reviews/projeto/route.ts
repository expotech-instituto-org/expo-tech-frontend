import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

// Em produção, usa a variável do servidor. Em dev, pode usar NEXT_PUBLIC
const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'https://expo-tech-backend.onrender.com/api/';

// Configuração para aceitar certificados auto-assinados apenas em desenvolvimento
const httpsAgent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV === 'production',
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pega todos os query params e passa para o backend
    const queryString = searchParams.toString();
    const url = queryString
      ? `${BACKEND_URL}reviews/project?${queryString}`
      : `${BACKEND_URL}reviews/project`;

    // Pega os headers de autenticação se existirem
    const authorization = request.headers.get('authorization');
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (authorization) {
      headers['Authorization'] = authorization;
    }

    console.log('GET /api/reviews/projeto - URL do backend:', url);

    const response = await axios.get(url, {
      headers,
      httpsAgent: httpsAgent,
      validateStatus: () => true,
    });

    console.log('Resposta do backend - Status:', response.status);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Erro ao fazer proxy para /reviews/project:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Pega os headers de autenticação se existirem
    const authorization = request.headers.get('authorization');
    const headers: any = {
      'Content-Type': 'application/json',
    };

    if (authorization) {
      headers['Authorization'] = authorization;
    }

    console.log('POST /api/reviews/projeto - URL do backend:', `${BACKEND_URL}reviews/project`);

    const response = await axios.post(`${BACKEND_URL}reviews/project`, body, {
      headers,
      httpsAgent: httpsAgent,
      validateStatus: () => true,
    });

    console.log('Resposta do backend - Status:', response.status);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Erro ao fazer proxy para /reviews/project:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
}

