# SPEC.md — SRM Credit Engine (Frontend)

## 1. Visão Geral e Arquitetura

O frontend do **SRM Credit Engine v2** foi projetado para servir como a interface principal da mesa de operações da SRM Asset. A aplicação foi desenvolvida utilizando **Angular 17+ (Standalone Components)** e **TypeScript**, priorizando reatividade nativa de alta performance, tipagem forte e desacoplamento via arquitetura *Contract-First*.

### Organização de Estrutura e Camadas (`src/app/`)
* `landing/` ou `components/`: Componentes de apresentação e contêineres de tela (ex: Simulador de Crédito & Deságio).
* `credit-engine/services/`: Camada de integração REST (`HttpClient`), responsável por encapsular as chamadas para o backend Spring Boot, tratamento de exceções de transporte e tipagem de payloads.
* `models/`: Interfaces TypeScript estritas espelhando os contratos OpenAPI (DTOs da API).

---

## 2. Decisões de Arquitetura e Reatividade (Angular Signals)

- **Gestão de Estado Reativa Otimizada:** Adoção integral de **Angular Signals** (`signal()`) para gerenciar o estado reativo local dos parâmetros de entrada (`faceValue`, `termMonths`, `discountRate`, `assetType`) e o retorno da API (`latestResponse`).
- **Performance e Fine-Grained Reactivity:** A utilização de Signals elimina o *overhead* de bibliotecas externas pesadas de estado global (como NGRX), permitindo uma detecção de alterações localizada e cirúrgica (*fine-grained reactivity*).
- **Abordagem Contract-First:** Paridade total com a especificação OpenAPI do backend. Toda a comunicação de entrada e saída utiliza interfaces estritamente tipadas, eliminando o uso de `any` no consumo de dados financeiros.

---

## 3. Experiência do Operador (UX Financeiro) e Parâmetros

- **Simulação e Liquidação Explícita:** A interface separa a alteração de parâmetros do momento de gravação final. A simulação/liquidação dispara uma requisição POST oficial para a API, registrando a proposta e retornando o limite aprovado e o status real processado pelo backend.
- **Carga Rápida dos Golden Cases (C1, C2 e C3):** Inclusão de botões de atalho no topo da página que preenchem instantaneamente os formulários com as premissas oficiais do teste:
  - **C1:** Duplicata Mercantil, R$ 100.000,00, 3 meses, 1.5% a.m. (Esperado: R$ 92.859,94).
  - **C2:** Cheque Pré-datado, R$ 25.000,00, 2 meses, 2.5% a.m. (Esperado: R$ 23.337,77).
  - **C3:** Duplicata Mercantil (USD), R$ 100.000,00, 3 meses, Câmbio 5.4321 (Esperado: US$ 17.094,67).

---

## 4. Precisão Numérica e Formatação Dinâmica de Moeda

- **Internacionalização e Formatação Dinâmica:** Uso de *pipes* de moeda nativos do Angular (`currency`) vinculados à propriedade `targetCurrency` retornada pelo backend.
  - Exibe **R$** para moeda nacional (`BRL`).
  - Exibe **US$** / **$** automaticamente quando o ativo for liquidado em dólares (`USD`), garantindo clareza visual nas operações *cross-currency*.
- **Exibição do Algoritmo Financeiro:** A interface destaca visualmente a política de arredondamento adotada pelo motor (`HALF_EVEN` / *Banker's Rounding*), assegurando conformidade com as regras de homologação.

---

## 5. Critérios de Aceite e Resiliência do Frontend

- **Tratamento Elegante de Erros HTTP:** Requisições que falharem devido à indisponibilidade do backend ou latência de rede são interceptadas na camada de serviço, alertando o operador via notificação clara sem quebrar a renderização da tela.
- **Validação de Entrada:** Tipagem e restrições nativas no formulário (`input type="number"`) para prevenir o envio de valores negativos ou inconsistentes.