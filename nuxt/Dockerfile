FROM node:18.15.0-alpine3.17
#RUN apk update && apk upgrade
#RUN npm install -g npm@9.6.2
WORKDIR /app
#COPY ./package.json ./
#RUN npm install && npm cache clean --force
COPY . .
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
#ENV NEXTAUTH_URL=http://localhost:3000
#ENV ORIGIN=http://localhost:3000
#ENV AUTH_ORIGIN=http://localhost:3000
CMD $COMANDTORUN
#CMD ["npm", "run", "dev"]
#CMD ["node", ".output/server/index.mjs"]
