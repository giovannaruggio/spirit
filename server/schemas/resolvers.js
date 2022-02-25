const { AuthenticationError } = require('apollo-server-express');
const { User, Cocktail } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('cocktails');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('cocktails');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addCocktail: async (parent, {name, instructions,image, isAlcoholic, ingredients}) => {
      
    },
    removeCocktail: async (parent, args, context) => {
      
      throw new AuthenticationError("You need to be logged in!");
    },
    saveCocktail: async (parent, { cocktailToSave }, context) => {
      
      throw new AuthenticationError("You need to be logged in!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    
  },
};

module.exports = resolvers;

