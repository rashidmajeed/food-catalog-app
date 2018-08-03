const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {

  Query: {
    getAllFood: async (root, args, { Food }) => {
      const allFood = await Food.find();
      return allFood;
    }
  },

  Mutation: {
    addFood: async (root, { name, category, description, instructions, username }, { Food }) => {
      const newFood = await new Food({
        name,
        category,
        description,
        instructions,
        username
      }).save();

      return newFood;

    },

    // Mutation for the signup for User
    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
  }
};