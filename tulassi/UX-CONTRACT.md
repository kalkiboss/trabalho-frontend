# Contrato de experiência · Tulassi

Este projeto acadêmico funciona apenas no navegador. A entrada cria um perfil demonstrativo na sessão atual. As solicitações são gravadas no armazenamento local, por e-mail informado, e aparecem no painel. Não há autenticação, profissional ou reserva real.

## Fluxo e recuperação

| Operação | Ação | Sucesso | Falha |
| --- | --- | --- | --- |
| Entrar | Nome e e-mail válidos | Abre o painel | Exibe erro no campo ou informa bloqueio de armazenamento |
| Solicitar | Serviço, data, hora, modalidade e ciência | Salva localmente e mostra painel com mensagem | Mantém campos preenchidos, indica erro e permite tentar novamente |
| Sair | Link Sair | Encerra perfil da sessão e abre entrada | O armazenamento local dos pedidos permanece |

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | Native select in agendamento.html | premium-ui.json | Native platform popup | Keyboard and selection review |
| Date | Native date and time fields in agendamento.html | premium-ui.json | Native platform popup | Date, time and future validation |
| Form | Shared validation helpers in assets/js/app.js | This contract | Entry and schedule | Field errors and recovery |
| Scrollbar | Global assets/css/style.css | DESIGN.md | Horizontal table overflow | Narrow viewport review |
| Toast | Inline status region on dashboard.html | This contract | Save success | Live region and focus |
| CRUD | Local booking store in assets/js/app.js | This contract | Create and read | Save, reload and empty state |

## Acessibilidade e conteúdo

Português do Brasil, títulos exclusivos, navegação por teclado, foco visível, campos rotulados, mensagens de erro ligadas aos campos e tabela com cabeçalhos. Select e calendário aceitam aparência e idioma do navegador. O vocabulário é “solicitação salva”, nunca “consulta confirmada”.
