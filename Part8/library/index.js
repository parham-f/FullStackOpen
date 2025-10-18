const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const jwt = require('jsonwebtoken')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
const { makeBookCountLoader } = require('./bookCountLoader')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require("./models/user")
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const wsCleanup = useServer(
  {
    schema,
    keepAlive: 15000,
    context: async (ctx) => {
      const raw =
        ctx.connectionParams?.authorization ||
        ctx.connectionParams?.Authorization ||
        null;
      const token = raw?.replace(/^Bearer\s+/i, '') || null;

      let currentUser = null;
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          currentUser = await User.findById(decoded.id);
        } catch {
          console.log('WS auth token invalid/expired (proceeding as anon)');
        }
      }

      return {
        currentUser,
        loaders: { bookCount: makeBookCountLoader() },
      };
    },
    onError: (_ctx, _msg, _args, errors) => {
      console.error('WS onError', errors);
    },
    onNext: (_ctx, _msg, _args, _result) => {
      console.log('WS onNext result sent');
    },
  },
  wsServer
);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsCleanup.dispose();
            },
          };
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
           return {
          currentUser,
          loaders: {
            bookCount: makeBookCountLoader(),
          },
        }
        }
      },
    }),
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()