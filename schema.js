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


    getCurrentUser: User
}

type Token {
    token: String!
}

type Mutation {
    addFood(name: String!, category: String!, description: String!, instructions: String!, username: String): Food
    signinUser(username: String!, password: String!): Token 
    signupUser(username: String!, email: String!, password: String!): Token 
}
`;