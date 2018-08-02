exports.typeDefs = `


type Food {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    _id: ID
    username: String! @unique
    password: String! 
    email: String!
    joinDate: String
    favorites: [Food]
}


type Query {
    getAllFood: [Food]
}

type Mutation {
    addFood(name: String!, category: String!, description: String!, instructions: String!, username: String): Food
}
`;