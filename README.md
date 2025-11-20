# Sobre

Gallery Photos App é um aplicativo fullstack composto por um backend em Node.js com Express e um frontend em React. O objetivo do sistema é permitir o upload, visualização e gerenciamento de fotografias armazenadas em nuvem e registradas no banco de dados MongoDB. O repositório é estruturado com duas pastas principais, backend e frontend, localizadas dentro da pasta raiz.

# Como Rodar Localmente

Para executar o projeto localmente é necessário ter instalado Node.js e um banco de dados MongoDB, seja local ou através do serviço MongoDB Atlas. Primeiro é preciso configurar e executar o backend. Para isso, acesse a pasta backend utilizando `cd backend` e instale as dependências com `npm install`. Após a instalação, crie um arquivo `.env` na raiz do backend contendo as configurações essenciais, incluindo `MONGODB_URI` com a URL de conexão ao banco de dados, `PORT` definindo a porta de execução do servidor (geralmente 5000) e outras variáveis relacionadas ao serviço de armazenamento de imagens caso o projeto utilize Cloudinary ou similar. Depois de configurado, o servidor pode ser iniciado com `npm run dev` ou `npm start`.

Com o backend em execução, configure o frontend acessando a pasta frontend com `cd frontend` e instalando as dependências com `npm install`. Para executar a aplicação, utilize `npm run dev`, o que inicializará o servidor de desenvolvimento do React. Caso o frontend se comunique com o backend através de variáveis de ambiente, é necessário configurar o arquivo `.env` dentro da pasta frontend contendo, por exemplo, `VITE_API_URL` apontando para o endereço do backend.

# Configuração do Banco de Dados

Para configurar o banco de dados MongoDB, é possível utilizar o serviço local executando `mongodb://localhost:27017/galleryphotos`, ou criar um cluster gratuito no MongoDB Atlas e copiar a connection string fornecida pelo serviço. Substitua o valor correspondente na variável `MONGODB_URI` do backend. Certifique-se de que o banco está ativo antes de iniciar a aplicação.

# Considerações Finais

Com backend e frontend configurados corretamente, o projeto estará pronto para ser executado de forma local. Basta manter o backend e o frontend rodando simultaneamente para acessar todas as funcionalidades do aplicativo.
