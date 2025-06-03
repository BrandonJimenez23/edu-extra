FROM node:20.11.1-slim

WORKDIR /app

# Copiar archivos necesarios e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del servidor de Vite
EXPOSE 5173

# Comando para iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]