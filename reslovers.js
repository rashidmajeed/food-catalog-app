const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {

  Query: {
    getAllFood: async (root, args, { Food }) => {
      const allFood = await Food.find();
      return allFood;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'favorites',
          model: 'Food'
        });
      return user;
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
    // Mutation for the signIn for User
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isvalidPassword = await bcrypt.compare(password, user.password);
      if (!isvalidPassword) {
        throw new Error("Invalid Password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
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