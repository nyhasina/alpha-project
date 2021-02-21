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
