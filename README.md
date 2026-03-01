# TaskApp

## Servidor de desenvolvimento

Este projeto é um pequeno aplicativo Angular para gerenciamento de tarefas. A estrutura usa componentes independentes (standalone) e um serviço de autenticação via API.

### Visão geral

- Autenticação (cadastro/login) contra um backend REST
- Armazenamento de token JWT e interceptador HTTP para enviar o cabeçalho
- Componentes compartilhados para formulários e listas de tarefas

### Como subir

1. Instale as dependências:

   ```bash
   cd /home/cleison/projetos/task-app
   npm install
   ```

2. Inicie a API do servidor (deve escutar em `http://localhost:3000`).
3. Execute a aplicação Angular:

   ```bash
   npm start
   # ou ng serve
   ```

   Acesse `http://localhost:4200` no navegador. O servidor recarrega
a aplicação automaticamente ao salvar alterações.