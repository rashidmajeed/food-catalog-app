exports.typeDefs = `


type Food {
    name: String!
    category: String!
    description: String!
    instruction: String!
    createdDate: String
    likes: Int
    username: String
}

type User {
    username: String! @unique
    password: String! 
    email: String!
    joinDate: String
    favorites: [Food]
}

`;