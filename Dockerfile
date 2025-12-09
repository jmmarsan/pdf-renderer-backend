# Imagen base ligera
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo package*.json primero (aprovecha cache)
COPY package*.json ./

# Instalar dependencias (solo prod si quieres)
RUN npm ci --omit=dev

# Copiar el resto del código
COPY . .

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000

# Exponer el puerto que usa Express
EXPOSE 3000

# Comando de arranque (ajusta al fichero real)
CMD ["node", "index.js"]
