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
  mutation addCocktail($name: String!, $instructions: String!, $image: String!, $isAlchoholic: Boolean!, $ingredients: [Ingredient]!) {
    addCocktail(name: $name, instructions: $instructions, image: $image, isAlchoholic: $isAlchoholic, ingredients: $ingredients) {
      cocktail {
        _id
        name
        instructions
        image
        isAlchoholic
        ingredients {
          ingredient
          measure
        }
      }
    }
  }
`;

export const SAVE_COCKTAIL = gql`
  mutation saveCocktail($userId: ID!, $cocktailId: ID!) {
    saveCocktail(userId: $userId, cocktailId: $cocktailId) {
      user {
        _id
        username
        email
        cocktails {
          _id
          name
          instructions
          image
          isAlchoholic
          ingredients {
            ingredient
            measure
          }
        }
      }
    }
  }
`;

export const DELETE_COCKTAIL = gql`
  mutation deleteCocktail($userId: ID!, $cocktailId: ID!) {
    deleteCocktail(userId: $userId, cocktailId: $cocktailId) {
      user {
        _id
        username
        email
        cocktails {
          _id
          name
          instructions
          image
          isAlchoholic
          ingredients {
            ingredient
            measure
          }
        }
      }
    }
  }
`;