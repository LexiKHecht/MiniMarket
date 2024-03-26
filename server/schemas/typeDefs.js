const typeDefs = `

  type Product {
    _id: ID
    productId: String
    name: String
    description: String
    imageURL: String
    quantity: Int
    price: Price
    tags: [String]
  }

type Price {
  amount: Float
  currencyCode: String
}

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    orders: [Order]
    thoughts: [Thought]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    imageURL: String
    price: Float
    quantity: Int
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
  }

  type Query {
    products(tags: String, name: String): [Product]
    product(_id: ID!): Product
    user: User
    users: [User]
    me: User

    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
  }
  type PaymentResult {
    success: Boolean!
    message: String!
    chargeId: String
    }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!, thoughtAuthor: String!, productId: String!): Thought
    removeThought(thoughtId: ID!): Thought
    processPayment(amount: Int!, token: String!): PaymentResult!

  }
`;

module.exports = typeDefs;
