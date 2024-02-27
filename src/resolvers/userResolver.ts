import { UserModel } from '../models/user';
import { generateToken } from '../middlewares/authenticationJWT';
import { AnyObject } from 'mongoose';

const userResolver = {
  Query: {
    getUsers: async () => {
      return await UserModel.find();
    },
    getUserByUsername: async (_: any, { username }: { username: string }) => {
      return await UserModel.findOne({ username });
    }
  },
  Mutation: {
    createUser: async (_: AnyObject, { userInput }: { userInput: any }, { user }: { user: any }) => {
      // Verificar si el usuario está autenticado
      if (!user) {
        throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
      }

      const { username, password } = userInput;
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const newUser = new UserModel({
        username,
        password
      });
      return await newUser.save();
    },
    deleteUser: async (_: any, { username }: { username: string }, { user }: { user: any }) => {
      // Verificar si el usuario está autenticado
      if (!user) {
        throw new Error('No autenticado. Debe iniciar sesión para realizar esta acción.');
      }


      return await UserModel.findOneAndDelete({ username });
    },
    login: async (_: any, { userInput }: { userInput: any }) => {
      const { username, password } = userInput;
      const user = await UserModel.findOne({ username });

      if (!user) {
        throw new Error('User not found');
      }

      const token = generateToken(username);

      return { token: token };
    }
  }
};

export default userResolver;
