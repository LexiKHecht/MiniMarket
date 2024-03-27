import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought(
    $thoughtText: String!
    $thoughtAuthor: String!
    $productId: String!
  ) {
    addThought(
      thoughtText: $thoughtText
      thoughtAuthor: $thoughtAuthor
      productId: $productId
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      productId
    }
  }
`;

export const PROCESS_PAYMENT_MUTATION = gql`
  mutation ProcessPayment($amount: Int!, $token: String!) {
    processPayment(amount: $amount, token: $token) {
      success
      message
      chargeId
    }
  }
`;
export const NEW_LISTING = gql`
  mutation addListing(
    $name: String!
    $description: String!
    $imageURL: String!
    $quantity: Int!
    $tags: [String]
    $price: Float!
  ) {
    addListing(
      name: $name
      description: $description
      imageURL: $imageURL
      quantity: $quantity
      tags: $tags
      price: $price
    ) {
      name
      description
      imageURL
      quantity
      tags
      price
    }
  }
`;
