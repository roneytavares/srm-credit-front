# SRM Credit Engine — Frontend (Angular 17+)

Interface web moderna para a mesa de operações da SRM Asset, projetada para a simulação, avaliação e liquidação de propostas de crédito e deságio de recebíveis com suporte a operações *cross-currency* (BRL/USD).

---
## 📸 Interface do Frontend
![Tela Principal do Sistema](./public/print-frontend.png)

## 🚀 Tecnologias e Stack

* **Angular 17+** (Standalone Components)
* **TypeScript** (Tipagem forte e integração OpenAPI)
* **Angular Signals** (Gestão de estado reativo de alta performance)
* **Tailwind CSS / SCSS** (Interface limpa e responsiva)
* **Nginx** (Servidor web leve para ambiente containerizado)
* **Docker & Docker Compose** (Containerização e orquestração)

---

## 📐 Decisões Arquiteturais e UX

1. **Dashboard em Página Única (Single-Page Dashboard):** Concentra o formulário de simulação, os botões de atalho e os cards de resposta em uma única tela, garantindo velocidade de execução e excelente experiência para o operador.
2. **Reatividade com Angular Signals:** Atualização fina e instantânea da interface sem o *overhead* de storages globais pesados (como NgRx).
3. **Abordagem Contract-First:** Consumo de interfaces TypeScript estritamente alinhadas ao contrato OpenAPI 3.0 do backend.
4. **Formatação Dinâmica Multimoeda:** Suporte automático para exibição de símbolos monetários (`R$` para BRL e `$` para USD) no card de resultado.

---

## ⚡ Carga Rápida de Golden Cases

A aplicação conta com atalhos de preenchimento automático no topo do painel para homologação instantânea dos cenários oficiais do desafio:

* **C1 (Duplicata Mercantil em BRL):** R$ 100.000,00 | 3 Meses | Spread 1,5% a.m. $\rightarrow$ **Esperado: R$ 92.859,94**
* **C2 (Cheque Pré-datado em BRL):** R$ 25.000,00 | 2 Meses | Spread 2,5% a.m. $\rightarrow$ **Esperado: R$ 23.337,77**
* **C3 (Cross-Currency USD):** R$ 100.000,00 | 3 Meses | Câmbio 5.4321 $\rightarrow$ **Esperado: US$ 17.094,67**

---

## 🛠️ Como Executar o Projeto

> **Importante:** O backend Spring Boot (`srm-credit-back`) precisa estar em execução na porta `8080` (ou acessível via rede Docker) para que a simulação e a liquidação processem com sucesso.

### Opção A: Execução via Docker Compose (Recomendado)

Esta opção compila a aplicação Angular via *multi-stage build* e serve os artefatos estáticos através do Nginx.

1. **Garantir que a rede ou o backend esteja rodando:**
   Certifique-se de que o projeto `srm-credit-back` está ativo em `http://localhost:8080`.

2. **Construir e subir o container do frontend:**
   ```bash
   docker compose up -d --build
   ```

3. **Acessar a aplicação:**
   Abra o navegador em [http://localhost:4200](http://localhost:4200).

---

### Opção B: Execução Local com Node.js / Angular CLI

#### Pré-requisitos
* Node.js 18+ ou 20+ instalado.
* NPM instalado.

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Executar o servidor de desenvolvimento:**
   ```bash
   npm start
   # ou: ng serve
   ```

3. **Acessar no navegador:**
   Navegue para [http://localhost:4200](http://localhost:4200). A aplicação recarregará automaticamente se você alterar qualquer código fonte.

---

## 🧪 Estrutura de Pastas

```text
src/
└── app/
    ├── credit-engine/
    │   └── services/       # Comunicação HTTP e integração REST
    ├── landing/            # Dashboard principal (Single-Page Component)
    └── models/             # Interfaces estritas espelhando a API Spring Boot
```

---

## 📜 Documentação Complementar

* **[DECISIONS.md](./DECISIONS.md):** Registro das decisões de design, escolha de framework e estratégia da Landing Page.
* **[SPEC.md](./SPEC.md):** Especificação técnica dos componentes, Signals e regras de formatação.
* **[REVIEW.md](./REVIEW.md):** Análise de boas práticas, resiliência de UI e paridade com o contrato da API.
