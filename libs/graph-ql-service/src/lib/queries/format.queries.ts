import { gql } from '@apollo/client';

export const CREATE_FORMAT = gql`
    mutation createFormat($name: String!, $coverImage: String, $platforms: [Int!]!) {
        createFormat(name: $name, coverImage: $coverImage, platforms: $platforms) {
            id
            name
        }
    }
`;

export const UPDATE_FORMAT = gql`
    mutation updateFormat($name: String!, $coverImage: String, $id: Int!, $platforms: [Int!]!) {
        updateFormat(name: $name, coverImage: $coverImage, id: $id, platforms: $platforms) {
            id
            name
            coverImage
        }
    }
`;

export const DELETE_FORMAT = gql`
    mutation deleteFormat($id: Int!) {
        deleteFormat(id: $id) {
            id
        }
    }
`;

export const LOAD_FORMAT = gql`
    query loadFormatById($id: Int!) {
        format(id: $id) {
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

export const LOAD_FORMATS = gql`
    query formats($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        formats(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
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
        formatCount(search: $search) {
            total
        }
    }
`;
