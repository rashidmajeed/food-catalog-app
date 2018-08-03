import { gql } from 'apollo-boost';

export const Get_All_Food = gql`

query {
getAllFood {

    name
    category
    description
    instructions
    likes
    createdDate
}
}

`