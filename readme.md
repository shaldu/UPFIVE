# Boiler code for Modern WEB APPs #

## This is a "Boiler code / example" to use as a starting point for a React Native app with Express, GraphQL and Prisma. ##

<b>Frontend:</b> <br>
- React Native

<b>Backend: </b> <br>
- Server: Express
- Database: Prisma (PostgreSQL)
- API: GraphQL

<i>Make sure you have a Docker container
with PostgreSQL running on your machine.</i>
<i>get docker like this: docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=admin -d postgres</i>

----------------------------------------
### SETUP ###
<b>npm install both the frontend and backend.</b> <br>

App (frontend): <br>
- cd app
- npm install

Server (backend): <br>
- cd server
- npm install

----------------------------------------
### RUNNING ###
<b>Starting the environments:</b> <br>

App (frontend):
- cd app
- npm run web

Server (backend):
- cd server
- npm run dev

Prisma:
- cd server
- npx prisma studio

----------------------------------------
### USEFUL COMMANDS ###
<b>Prisma commands:</b> <br>

push changes to the database:
- npx prisma db push

pull changes from the database:
- npx prisma db pull
