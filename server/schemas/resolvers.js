const { User, Product, Order, Thought } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// add in strip key^
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }
      throw AuthenticationError;
    },
    products: async (parent, { tag, name }) => {
      const params = {};

      if (tag) {
        params.tags = tag;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params);
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
  try {
    const url = new URL(context.headers.referer).origin;

    await Order.create({ products: args.products.map(({ productId}) => productId) });
    const line_items = [];
    // Iterate over products to create line items
    for (const product of args.products) {
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
            images: [`${url}/images/${product.image}`],
          },
          unit_amount: product.price * 100, // Assuming price is in dollars
        },
        quantity: product.purchaseQuantity,
      });
      console.log(line_items[0].product_data)
    }

    // Create checkout session with Stripe API
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/`,
    });

    // Return the session ID
    return { session: session.id };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in checkout resolver:", error);

    // Handle the error gracefully and return an error response
    throw new Error("An error occurred during checkout. Please try again.");
  }
},
    thoughts: async () => {
      return Thought.find().sort({ createdAt: -1 });
    },

    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
  },
  Mutation: {
    processPayment: async (_, { amount, token }) => {
      try {
        // Create a charge using the Stripe API
        const charge = await stripe.charges.create({
          amount,
          currency: "usd",
          source: token, // Payment token received from client
          description: "Payment for goods/services",
        });

        // Return success message or any relevant data
        return {
          success: true,
          message: "Payment processed successfully",
          chargeId: charge.id,
        };
      } catch (error) {
        console.error("Stripe Payment Error:", error);
        return { success: false, message: "Payment processing failed" };
      }
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addThought: async (parent, { thoughtText, thoughtAuthor, productId }) => {
      console.log("in resolvers " + thoughtText + " " + thoughtAuthor + " " + productId);
      return Thought.create({ thoughtText, thoughtAuthor, productId });
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    addListing: async (parent, args) => {
      const product = await Product.create(args);
      
      return product;
    },
  },
};

module.exports = resolvers;
