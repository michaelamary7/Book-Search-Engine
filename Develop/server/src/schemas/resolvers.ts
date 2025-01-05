import User from '../models/User';
import Menu from '../models/Book';
import jwt from 'jsonwebtoken';

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: { user: { _id: any; }; }) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await User.findById(context.user._id);
    },
    getMenus: async (_parent: any, _args: any, context: { user: { _id: any; }; }) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return await Menu.find({ userId: context.user._id });
    },
  },
  Mutation: {
    login: async (_parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
      return token;
    },
    createUser: async (_parent, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const user = new User({ username, email, password });
      await user.save();
      return user;
    },
    createMenu: async (_parent, { name, userId, items, theme }) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const menu = new Menu({ name, userId: context.user._id, items, theme });
      await menu.save();
      return menu;
    },
  },
};

export default resolvers;
