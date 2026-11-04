# Etapa 1: Build da aplicação Angular
FROM node:20-alpine AS build
WORKDIR /app

# Copia os ficheiros de dependências
COPY package.json package-lock.json ./
RUN npm ci

# Copia o código fonte e faz o build de produção
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copia os artefactos gerados no build para a pasta pública do Nginx
COPY --from=build /app/dist/srm-credit-front/browser /usr/share/nginx/html

# Copia uma configuração customizada do Nginx (opcional, mas recomendado para SPAs)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]