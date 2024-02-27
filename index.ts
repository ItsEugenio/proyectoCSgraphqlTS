import { connectToDatabase } from './src/configs/database';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const typeDefsArray = loadFilesSync(path.join(__dirname, './src/schema'));
const resolversArray = loadFilesSync(path.join(__dirname, './src/resolvers'));

const schema = makeExecutableSchema({
  typeDefs: typeDefsArray,
  resolvers: resolversArray
});

const server = new ApolloServer({
  schema
});

const PORT = parseInt(process.env.PORT || "3000");

(async () => {
  try {
      const { url } = await startStandaloneServer(server, {
          listen: { port: PORT }
      });
      console.log(`Servidor GraphQL en funcionamiento en ${url}`);
  } catch (error) {
      console.error('Error al iniciar el servidor:', error);
  }
})();


async function main() {
  // Conectar a la base de datos MongoDB
  await connectToDatabase();
}

// Ejecutar la función main
main().catch(error => {
  console.error('Error al iniciar la aplicación:', error);
});
