import { gql } from '@apollo/client';

export const CREATE_PLATFORM = gql`
    mutation createPlatform($name: String!, $logo: String, $deleted: Boolean) {
        createPlatform(name: $name, logo: $logo, deleted: $deleted) {
            id
            name
            logo
        }
    }
`;

export const UPDATE_PLATFORM = gql`
    mutation updatePlatform($name: String!, $logo: String, $deleted: Boolean, $id: Int!) {
        updatePlatform(name: $name, logo: $logo, deleted: $deleted, id: $id) {
            id
            name
            logo
        }
    }
`;

export const DELETE_PLATFORM = gql`
    mutation deletePlatform($id: Int!) {
        deletePlatform(id: $id) {
            id
            name
            logo
            deleted
        }
    }
`;

export const LOAD_PLATFORM = gql`
    query platform($id: Int!) {
        platform(id: $id) {
            id
            name
            logo
        }
    }
`;

export const LOAD_PLATFORMS = gql`
    query platforms {
        platforms {
            id
            name
            logo
            deleted
        }
    }
`;
