import { gql } from '@apollo/client';

export const CREATE_GAME = gql`
    mutation createGame($name: String!, $coverImage: String, $platforms: [Int!]!) {
        createGame(name: $name, coverImage: $coverImage, platforms: $platforms) {
            id
            name
        }
    }
`;

export const UPDATE_GAME = gql`
    mutation updateGame($name: String!, $coverImage: String, $id: Int!, $platforms: [Int!]!) {
        updateGame(name: $name, coverImage: $coverImage, id: $id, platforms: $platforms) {
            id
            name
            coverImage
        }
    }
`;

export const DELETE_GAME = gql`
    mutation deleteGame($id: Int!) {
        deleteGame(id: $id) {
            id
            name
            coverImage
            platforms {
                id
                name
                logo
                deleted
            }
        }
    }
`;

export const LOAD_GAME = gql`
    query game($id: Int!) {
        game(id: $id) {
            id
            name
            coverImage
            platforms {
                id
                name
            }
        }
    }
`;

export const LOAD_GAMES = gql`
    query games {
        games {
            id
            name
            coverImage
            platforms {
                id
                name
            }
        }
    }
`;
