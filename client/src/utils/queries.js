import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($tags: String) {
    products(tags: $tags) {
      productId
      _id
      name
      description
      price {
        amount
        currencyCode
      }
      quantity
      imageURL
      tags
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      productId
      name
      description
      imageURL
      price {
        amount
        currencyCode
      }
      quantity
      tags
    }
  }
`;

// export const QUERY_CATEGORIES = gql`
//   {
//     Tag {
//       tags
//     }
//   }
// `;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      username
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price {
            amount
            currencyCode
          }
          quantity
          imageURL
        }
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
