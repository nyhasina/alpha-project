import { gql } from '@apollo/client';

export const CREATE_FORMAT = gql`
    mutation createFormat($name: String!, $code: String!) {
        createFormat(name: $name, code: $code) {
            id
            name
            code
        }
    }
`;

export const UPDATE_FORMAT = gql`
    mutation updateFormat($name: String!, $code: String!, $id: Int!) {
        updateFormat(name: $name, code: $code, id: $id) {
            id
            name
            code
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
            code
        }
    }
`;

export const LOAD_FORMATS = gql`
    query formats($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        formats(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
            code
        }
        formatCount(search: $search) {
            total
        }
    }
`;
