# Configuração das Rotas de API

## Rotas Disponíveis

As seguintes rotas de API estão disponíveis para fazer proxy com o backend:

- `POST /api/users/login` - Login de usuários
- `GET /api/reviews/projeto?project_id={id}` - Listar reviews de um projeto específico
- `GET /api/reviews/projeto` - Listar todos os reviews
- `POST /api/reviews/projeto` - Criar review de projeto

**Nota:** O parâmetro `project_id` é enviado como query parameter no frontend (`?project_id=123`) e passado diretamente para o backend no mesmo formato.

## Configuração de Ambiente

### Desenvolvimento Local

No arquivo `.env` local:

```env
NEXT_PUBLIC_BACKEND_URL="https://expo-tech-backend.onrender.com/api/"
BACKEND_URL="https://expo-tech-backend.onrender.com/api/"
NODE_ENV=development
```

### Desenvolvimento na Vercel (Preview)

Configure as seguintes variáveis de ambiente na Vercel:

1. `NEXT_PUBLIC_BACKEND_URL` = `https://expo-tech-backend.onrender.com/api/`
2. `BACKEND_URL` = `https://expo-tech-backend.onrender.com/api/`
3. `NODE_ENV` = `development` (ou remova para usar o padrão da Vercel)

### Produção na Vercel

Configure as seguintes variáveis de ambiente na Vercel:

1. `NEXT_PUBLIC_BACKEND_URL` = `https://expo-tech-backend.onrender.com/api/`
2. `BACKEND_URL` = `https://expo-tech-backend.onrender.com/api/`
3. `NODE_ENV` = `production` (padrão da Vercel)

## Como Funciona

### Segurança SSL

O código está configurado para:

- **Desenvolvimento (`NODE_ENV=development`)**: Aceita certificados auto-assinados ou inválidos
- **Produção (`NODE_ENV=production`)**: Valida certificados SSL corretamente (comportamento seguro)

```typescript
const httpsAgent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV === 'production',
});
```

### Suporte a Múltiplos Formatos

A rota `/api/users/login` aceita:
- `application/json`
- `application/x-www-form-urlencoded`
- Texto puro (tenta detectar automaticamente)

**Importante:** O backend espera `application/x-www-form-urlencoded`, então todos os formatos são convertidos automaticamente antes de enviar ao backend.

### Query Parameters

A rota `/api/reviews/projeto` aceita o seguinte query parameter:
- `project_id` (string | null): ID do projeto para filtrar reviews. Se omitido, retorna todos os reviews.

### Autenticação

As rotas de reviews (`/api/reviews/projeto`) suportam o header `Authorization`:

```javascript
fetch('/api/reviews/projeto', {
  headers: {
    'Authorization': 'Bearer seu-token-aqui'
  }
})
```

## Exemplos de Uso

### Login

```javascript
// Usando JSON
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'usuario',
    password: 'senha'
  })
});

// Usando form-urlencoded
const response = await fetch('/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'username=usuario&password=senha'
});
```

### Reviews

```javascript
// GET - Listar reviews de um projeto específico (usando project_id como query parameter)
const response = await fetch('/api/reviews/projeto?project_id=123', {
  headers: {
    'Authorization': 'Bearer seu-token'
  }
});

// GET - Listar todos os reviews (sem filtro)
const response = await fetch('/api/reviews/projeto', {
  headers: {
    'Authorization': 'Bearer seu-token'
  }
});

// POST - Criar review
const response = await fetch('/api/reviews/projeto', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer seu-token'
  },
  body: JSON.stringify({
    project_id: 123,
    rating: 5,
    comment: 'Excelente!'
  })
});
```

## Troubleshooting

### Erro de Certificado SSL

Se você ainda encontrar erros de certificado SSL em desenvolvimento local, verifique:

1. A variável `NODE_ENV` está definida como `development`
2. O axios está instalado: `npm install axios`

### Erro 500

Verifique:

1. A URL do backend está correta nas variáveis de ambiente
2. O backend está acessível e respondendo
3. Os logs do console para detalhes do erro

### Na Vercel

Certifique-se de que:

1. Todas as variáveis de ambiente estão configuradas no painel da Vercel
2. O deploy foi feito após configurar as variáveis
3. As variáveis estão disponíveis tanto para Preview quanto para Production (configure separadamente se necessário)

