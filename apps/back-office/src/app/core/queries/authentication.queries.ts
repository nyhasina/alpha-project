import { gql } from 'apollo-angular';

export const SIGN_IN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
        }
    }
`;
