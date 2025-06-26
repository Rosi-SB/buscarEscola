# 🏫 Busca de Escolas Municipais

Este projeto é uma aplicação web desenvolvida em HTML, CSS e JavaScript puro (vanilla JS), com o objetivo de permitir a busca e filtragem de escolas municipais e municipalizadas por diferentes critérios.

## ✨ Funcionalidades

- 🔍 Busca por nome da escola
- 📍 Filtro por endereço ou bairro
- 🏷️ Filtro por tipo de escola (Fundamental ou Infantil)
- 📊 Exibição dinâmica dos resultados com contagem
- 🧹 Tags de filtros ativos com opção de remoção
- 🌀 Animação de carregamento
- 💡 Dados carregados a partir de um arquivo JSON externo (`escolas.json`)

## 🗂 Estrutura do Projeto

/projeto-escolas/
├── index.html # Página principal da aplicação
├── styles.css # Estilos customizados
├── script.js # Lógica de filtragem e renderização
├── escolas.json # Arquivo de dados com informações das escolas
└── README.md # Este arquivo


## 🧪 Como Executar

1. Clone ou baixe este repositório.
2. Certifique-se de que todos os arquivos estão na mesma pasta.
3. Rode um servidor local (necessário para o `fetch` funcionar):

### Com Python 3.x:
```bash
cd /caminho/para/o/projeto
python -m http.server

http://localhost:8000/index.html 
````

## 🔗 Fonte dos Dados

As informações sobre as escolas municipais foram obtidas no site oficial da Prefeitura de Catanduva:

> **Prefeitura Municipal de Catanduva – Secretaria Municipal de Educação**  
> [https://www.catanduva.sp.gov.br](https://www.catanduva.sp.gov.br)

Os dados foram organizados em formato JSON apenas para fins educacionais e demonstrativos.  
Recomenda-se consultar a fonte oficial para informações atualizadas.
