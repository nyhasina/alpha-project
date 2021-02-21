import { gql } from '@apollo/client';

export const LOAD_USER_BY_ID = gql`
    query user($id: Int!) {
        user(id: $id) {
            id
            email
            password
            profile {
                id
                firstname
                lastname
                username
                currency {
                    id
                    code
                    label
                }
                language {
                    id
                    code
                    label
                }
                deleted
            }
        }
    }
`;

export const LOAD_PAGINATED_USERS = gql`
    query users($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            email
            password
            profile {
                id
                firstname
                lastname
                username
                currency {
                    id
                    code
                    label
                }
                language {
                    id
                    code
                    label
                }
                deleted
            }
        }
    }
`;

export const LOAD_PAGINATED_USERS_AND_DEPENDENCIES = gql`
    query users($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            email
            password
            profile {
                id
                firstname
                lastname
                username
                currency {
                    id
                    code
                    label
                }
                language {
                    id
                    code
                    label
                }
                deleted
            }
        }
        currencies {
            id
            code
            label
        }
        languages {
            id
            code
            label
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser(
        $email: String!
        $password: String!
        $firstname: String
        $lastname: String
        $username: String
        $currency: Int
        $language: Int
    ) {
        createUser(
            email: $email
            password: $password
            firstname: $firstname
            lastname: $lastname
            username: $username
            currency: $currency
            language: $language
        ) {
            id
            email
            password
            profile {
                id
                firstname
                lastname
                username
                currency {
                    id
                    code
                    label
                }
                language {
                    id
                    code
                    label
                }
                deleted
            }
        }
    }
`;
