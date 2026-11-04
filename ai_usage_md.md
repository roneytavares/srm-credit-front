# AI_USAGE.md — Relatório de Engenharia e Colaboração com IA (Frontend)

> **Projeto:** SRM Credit Engine — Frontend (Angular 17+ & Nginx)
>
> **Objetivo:** Documentar a assistência da Inteligência Artificial no desenvolvimento, resolução de erros de compilação, containerização e boas práticas de UI.

## 1. Resumo Executivo da Colaboração com IA

A inteligência artificial atuou como co-piloto técnico e revisor de arquitetura no ecossistema do frontend (`srm-credit-front`). O foco principal foi garantir a paridade com o contrato OpenAPI do backend, implementar uma interface reativa e performática utilizando *Angular Signals*, e estruturar um ambiente de containerização robusto com Docker e Nginx para Single Page Applications (SPAs).

---

## 2. Análise de Erros, Refatoração e Acertos

### 🎨 2.1 Componentes de UI, Tipagem e Reatividade

* **Falhas e Desafios Iniciais:**
  * **Erro de Compilação do TypeScript:** Divergência inicial no contrato onde a propriedade `targetCurrency` era referenciada nos componentes de template mas faltava na interface TypeScript estrita (`CreditProposalResponse`).
  * **Gestão de Estado:** Risco de acoplamento excessivo caso fosse utilizada uma biblioteca pesada de estado global desnecessária para o escopo do desafio.

* **Processo de Refatoração:**
  * A IA identificou instantaneamente a linha do erro de compilação e sugeriu a adição segura do campo opcional (`targetCurrency?: string`) no modelo correspondente.
  * Adotou-se o **Angular Signals** como o padrão reativo leve, permitindo atualizações granulares de estado de forma limpa e sem *overhead*.

* **Principais Acertos:**
  * Criação de uma Single-Page Dashboard coesa que concentra simulação, atalhos de Golden Cases e cartões de resposta no mesmo fluxo operacional.
  * Formatação dinâmica inteligente baseada no tipo de moeda (`R$` para BRL e `$` para USD).

---

### 🐳 2.2 Infraestrutura, Docker e Nginx

* **Falhas e Desafios Iniciais:**
  * **Ausência de Roteamento SPA no Nginx:** O build padrão do Nginx gerava erros `404` ao atualizar a página em rotas filhas do Angular.
  * **Erros de Permissão no Docker:** O habitual bloqueio de socket do Linux (`permission denied while trying to connect to the docker socket`).

* **Processo de Refatoração:**
  * A IA gerou o arquivo de configuração customizado `nginx.conf` contendo a regra essencial `try_files $uri $uri/ /index.html`.
  * Forneceu os comandos para correção definitiva da permissão do usuário local no grupo `docker` (`usermod` e `newgrp`).
  * Construção de um *Multi-stage Dockerfile* otimizado, separando a fase de build Node.js da imagem final de distribuição Nginx leve e performática.

* **Principais Acertos:**
  * Configuração limpa do `docker-compose.yml` para o front com mapeamento de portas correto (`4200:80`).
  * Documentação clara passo a passo para testar a aplicação integrada com o backend.

---

## 3. Decisões Humanas (O que não foi delegado)

1. **Validação de UX e Negócio:** A confirmação visual dos atalhos para os *Golden Cases* (C1, C2 e C3) e a priorização do layout voltado para a mesa de operações da SRM.
2. **Estratégia de Teste Final:** A decisão de validar a aplicação em execução local direta (`ng serve` e testes de API) em conjunto com a homologação dos containers.
3. **Revisão Final:** Validação humana integral de todas as especificações e documentações geradas.