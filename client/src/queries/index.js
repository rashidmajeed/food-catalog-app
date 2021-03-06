import { gql } from 'apollo-boost';


/* Food Queries*/
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
/* Food Mutation*/


/* User Queries*/
export const GET_CURRENT_USER = gql`

  query {
    getCurrentUser {
      username
      joinDate
      email
    }
  }

`;
/* User Mutation*/

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
