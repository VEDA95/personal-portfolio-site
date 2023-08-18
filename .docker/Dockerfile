FROM node:lts AS runtime
WORKDIR /usr/src/app
COPY . .
RUN npm install --omit=dev
RUN npm run build
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "start"]