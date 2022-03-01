const { AuthenticationError } = require('apollo-server-express');
const { User, Cocktail } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('cocktails');
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('cocktails');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addCocktail: async (parent, { name, instructions, image, isAlcoholic, ingredients }) => {
      console.log(name, instructions, image, isAlcoholic, ingredients);
      const cocktail = await Cocktail.create({ name, instructions, image, isAlcoholic, ingredients });
      console.log({cocktail});
      return cocktail;
    },
    removeCocktail: async (parent, { userId, cocktailId }, context) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { cocktails: cocktailId } },
        { $new: true }
      );
      return user;
    },
    saveCocktail: async (parent, { userId, cocktailId }, context) => {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { cocktails: { _id: cocktailId } } },
        { $new: true }
      );
      return user;
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

