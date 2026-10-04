# Pokédex — Trabalho Final Frameworks Web I

## Descrição

Aplicação web de Pokédex desenvolvida com React. A interface permite explorar Pokémon, pesquisar pelo nome, filtrar por tipo, navegar pelos resultados e consultar informações detalhadas de cada Pokémon.

## Objetivo

Demonstrar conceitos fundamentais de desenvolvimento de aplicações web com React, incluindo componentização, comunicação por props, gerenciamento de estado com Hooks, navegação entre páginas, consumo de API externa, busca, filtros, paginação e tratamento de estados de carregamento e erro.

## Funcionalidades

- Catálogo de Pokémon com ilustrações oficiais.
- Busca em tempo real pelo nome, sem diferenciar letras maiúsculas e minúsculas.
- Filtro por tipo obtido diretamente da API.
- Combinação entre busca por nome e filtro por tipo.
- Paginação dos resultados.
- Página individual de detalhes de cada Pokémon.
- Exibição de tipos, altura, peso, habilidades e estatísticas base.
- Indicadores de carregamento durante as requisições.
- Mensagens de erro amigáveis com opção para tentar novamente.
- Layout responsivo para dispositivos móveis e desktop.
- Página para rotas não encontradas.

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- Axios
- React Router DOM
- Material UI (MUI)
- Emotion
- PokéAPI

Os dados dos Pokémon são fornecidos pela [PokéAPI](https://pokeapi.co/api/v2/).

## Estrutura básica do projeto

```text
src/
    components/       Componentes reutilizáveis da interface
    pages/            Páginas da Pokédex, detalhes e rota não encontrada
    services/         Cliente Axios e funções de acesso à PokéAPI
    utils/            Funções auxiliares de apresentação
    App.jsx           Configuração das rotas da aplicação
    main.jsx          Ponto de entrada React e configuração do tema MUI
    styles.css        Estilos globais e responsividade

index.html            Documento de entrada do Vite
vite.config.js        Configuração do Vite e plugin React
package.json          Scripts e dependências do projeto
```

## Integrante

- Augusto Tadeu Rodrigues Souza

## Como executar localmente

É necessário possuir o Node.js instalado.

Clone ou baixe o projeto e, dentro da pasta do projeto, execute:

```bash
npm install
```

Depois, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação. Abra esse endereço no navegador para acessar a Pokédex.

## Dependências utilizadas

### Aplicação

- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`

### Desenvolvimento

- `vite`
- `@vitejs/plugin-react`

## API utilizada

A aplicação utiliza a PokéAPI para obter informações sobre os Pokémon, incluindo nomes, imagens, tipos, altura, peso, habilidades e estatísticas.

PokéAPI: https://pokeapi.co/api/v2/