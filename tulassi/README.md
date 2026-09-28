# Tulassi
Abra `index.html` no navegador ou use a extensão Live Server no VS Code. Não há instalação, dependências ou conexão com servidor.

## Estrutura

- `index.html`: entrada demonstrativa com nome e e-mail, sem senha.
- `dashboard.html`: solicitações salvas e lista de sugestões.
- `agendamento.html`: formulário de solicitação.
- `assets/css/style.css`: design responsivo compartilhado.
- `assets/js/app.js`: validação, navegação e armazenamento local.
- `DESIGN.md`: decisões visuais duráveis do projeto.

## Fluxo de teste

1. Abra `index.html`, informe nome e e-mail válidos e acesse.
2. Clique em **Solicitar sessão**, escolha tipo, data futura, horário entre 08h e 18h em intervalos de 30 minutos e modalidade.
3. Marque a ciência da demonstração e clique em **Salvar solicitação**.
4. Confira a solicitação no painel, atualize a página e verifique que ela continua listada.
5. Clique em **Sair**. O acesso demonstrativo é encerrado; os dados locais permanecem no navegador.

Os registros ficam no `localStorage`, separados por e-mail informado. O perfil de acesso fica no `sessionStorage`. Não há autenticação, backend, envio a profissionais nem garantia de privacidade em dispositivo compartilhado. Use apenas dados fictícios ao demonstrar. Para um serviço real, seriam necessários backend, autenticação, disponibilidade de horários e tratamento adequado de dados pessoais.
