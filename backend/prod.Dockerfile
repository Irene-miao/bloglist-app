FROM node:latest

ENV mongoUrl="mongodb+srv://fullstack:yaomima@cluster0.my5yk.mongodb.net/blogs-app?retryWrites=true&w=majority"

ENV PORT=3003

ENV SECRET="itissecret"

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start
