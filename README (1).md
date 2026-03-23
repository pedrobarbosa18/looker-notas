# 📋 Bloco de Notas — Looker

Widget de anotações colaborativas para embutir em painéis do Looker Studio. Permite que qualquer visualizador do painel adicione, visualize e exclua notas em tempo real, com todas as informações salvas automaticamente em uma planilha Google Sheets.

## Funcionalidades

- Anotações compartilhadas entre todos os usuários do painel
- Salvamento automático no Google Sheets
- Filtro por autor ou conteúdo
- Avatar com iniciais do autor
- Atualização automática a cada 60 segundos
- Nome do autor salvo no navegador para facilitar o uso

## Como funciona

O HTML se comunica com um Google Apps Script publicado como Web App, que lê e escreve na planilha. Não é necessário login — basta ter acesso ao link do painel.

## Integração com o Looker

Adicione um bloco de texto no painel e cole o código abaixo:

```html
<iframe src="https://seu-usuario.github.io/looker-notas/" 
  width="100%" height="520" frameborder="0"></iframe>
```

## Tecnologias

- HTML / CSS / JavaScript puro
- Google Apps Script (backend)
- Google Sheets (banco de dados)
- GitHub Pages (hospedagem)
