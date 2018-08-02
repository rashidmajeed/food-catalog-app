exports.resolvers = {

  Query: {
    getAllFood: async (root, args, { Food }) => {
      const allFood = await Food.find().exec();
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

    }

  }
}