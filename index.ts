import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectToDatabase } from './src/configs/database';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authenticateJWT } from './src/middlewares/authenticationJWT';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Define una interfaz extendida de Request con la propiedad user
interface CustomRequest extends Request {
  user?: any;
}

const typeDefsArray = loadFilesSync(path.join(__dirname, './src/schema'));
const resolversArray = loadFilesSync(path.join(__dirname, './src/resolvers'));

const schema = makeExecutableSchema({
  typeDefs: typeDefsArray,
  resolvers: resolversArray
});

const app = express();

const server = new ApolloServer({ 
  schema,
  context: ({ req }: { req: CustomRequest }) => {
    // Añadir el usuario al contexto para que esté disponible en los resolvers
    return { user: req.user };
  }
});

// Aplicar middleware de autenticación JWT a todas las rutas GraphQL
app.use('/graphql', authenticateJWT);


const PORT = parseInt(process.env.PORT || "3000");

app.listen(PORT, async () => {
  await server.start()
  server.applyMiddleware({ app: app as any });

  await connectToDatabase();
  console.log(`Servidor GraphQL en funcionamiento en http://localhost:${PORT}/graphql`);
});
