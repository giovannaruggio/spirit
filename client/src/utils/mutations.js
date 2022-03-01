import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COCKTAIL = gql`
  mutation addCocktail($name: String!, $instructions: String!, $image: String!, $isAlcoholic: Boolean!, $ingredients: [IngredientInput]) {
    addCocktail(name: $name, instructions: $instructions, image: $image, isAlcoholic: $isAlcoholic, ingredients: $ingredients) {
      _id
      name
      instructions
      image
      isAlcoholic
      ingredients {
        _id
        ingredient
        measure
      }
    }
  }
`;

export const SAVE_COCKTAIL = gql`
  mutation saveCocktail($userId: ID!, $cocktailId: ID!) {
    saveCocktail(userId: $userId, cocktailId: $cocktailId) {
      _id
      username
      email
      cocktails {
        _id
        name
        instructions
        image
        isAlcoholic
        ingredients {
          ingredient
          measure
        }
      }
    }
  }
`;

export const REMOVE_COCKTAIL = gql`
  mutation removeCocktail($userId: ID!, $cocktailId: ID!) {
    removeCocktail(userId: $userId, cocktailId: $cocktailId) {
      _id
      username
      email
      cocktails {
        _id
        name
        instructions
        image
        isAlcoholic
        ingredients {
          ingredient
          measure
        }
      }
    }
  }
`;