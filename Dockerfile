    FROM node:20-alpine AS build

    WORKDIR /app

    COPY package*.json tsconfig.json ./
    RUN npm ci

    ARG NEXT_PUBLIC_BACKEND_URL
    ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

    COPY . .
    RUN npm run build

    FROM node:20-alpine AS runtime
    WORKDIR /app

    COPY --from=build /app/.next ./.next
    COPY --from=build /app/public ./public
    COPY --from=build /app/package*.json ./ 
    COPY --from=build /app/next.config.mjs ./
    COPY --from=build /app/tsconfig.json ./

    RUN npm ci --omit=dev

    EXPOSE 3000
    CMD ["npm", "start", "--", "-p", "3000", "-H", "0.0.0.0"]
