FROM node:20.11.0-alpine as deps
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn prisma:generate


FROM node:20.11.0-alpine as build
WORKDIR /app
COPY --from=deps /app/node_modules/ ./node_modules
COPY . .
RUN yarn build


FROM node:20.11.0-alpine as execution
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY prisma/ ./prisma
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package.json
COPY static/ ./static
CMD [ "yarn", "start:prod" ]