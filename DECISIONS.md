# DECISIONS.md — Registro de Decisões Arquiteturais e Design (Frontend)

## 1. Escolha de Stack e Framework

* **Angular 17+ (Standalone Components):** Escolhido por oferecer tipagem forte nativa com TypeScript, arquitetura moderna baseada em componentes *standalone* (sem a necessidade de `NgModules` legados) e facilidade de integração com design systems corporativos.

## 2. Estrutura de Pastas Limpa e Componentizada

* **Decisão:** Adotou-se uma estrutura de diretórios modularizada, limpa e desacoplada baseada em responsabilidade única:

  * `src/app/credit-engine/`: Módulo e serviços focados estritamente na comunicação com o motor de crédito (camada de domínio).

  * `src/app/landing/`: Componente contêiner principal da interface do operador.

  * `src/app/models/`: Interfaces TypeScript estritas alinhadas ao contrato OpenAPI da API.

* **Justificativa:** Manter a camada de apresentação desacoplada da lógica de comunicação HTTP facilita testes, manutenção futura e isolamento de dependências.

## 3. Arquitetura de Landing Page Única (Single-Page Dashboard)

* **Decisão:** Escolha deliberada por uma página única (*Single-Page Dashboard*) concentrando o Simulador de Crédito, a Carga Rápida de Golden Cases (C1, C2 e C3) e o Card de Resposta da API.

* **Justificativa:**
  * **Velocidade de Entrega:** Elimina o *overhead* de rotas e navegações complexas desnecessárias para o escopo do desafio, permitindo focar o esforço no core financeiro, na precisão dos cálculos e na integração *Contract-First*.
  * **Desempenho e Latência Visual Zero:** A troca de cenários e a renderização do limite aprovado ocorrem de forma instantânea sem recarregar a tela.
  * **Experiência do Operador (UX):** Permite à mesa de operações alterar parâmetros, carregar Golden Cases e visualizar o retorno da API em um único painel de controle fluido e sem perda de contexto.

## 4. Reatividade com Angular Signals (Sem Storage Global Adicional)

* **Decisão:** Utilização nativa de **Angular Signals** (`signal()`) em substituição a bibliotecas externas de estado global (como NgRx ou Akita).

* **Justificativa:** Para a complexidade e o escopo do simulador de crédito da mesa de operações, Signals fornecem detecção de mudanças pontual e de altíssimo desempenho (*fine-grained reactivity*), eliminando o *boilerplate* excessivo de Redux/NgRx.

## 5. Estratégia Contract-First e Tipagem Forte

* **Decisão:** Consumo rigoroso dos DTOs e contratos definidos na OpenAPI 3.0.3 do backend Spring Boot (`CreditProposalResponse`, etc.).

* **Justificativa:** Elimina totalmente o uso de tipos `any` nas requisições e respostas, garantindo paridade de tipos em tempo de compilação e evitando erros de runtime durante simulações e liquidações.

## 6. Carga Rápida de Golden Cases

* **Decisão:** Implementação de atalhos de preenchimento automático para os cenários **C1, C2 e C3**.

* **Justificativa:** Facilita a homologação imediata por avaliadores e auditores da mesa de operações, injetando instantaneamente as premissas oficiais do desafio e disparando a consulta à API.

## 7. Formatação Dinâmica de Moedas (Multi-currency)

* **Decisão:** Utilização de *pipes* de moeda reativos (`currency:(latestResponse()?.targetCurrency ?? 'BRL')`).

* **Justificativa:** Garante que operações transacionadas em dólares (`USD`, como no Golden Case C3) alterem automaticamente a formatação do card de resultado para `US$` ou `$`, mantendo a clareza visual para transações *cross-currency*.