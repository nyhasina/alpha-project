import { gql } from '@apollo/client';

export const CREATE_TAG = gql`
    mutation createTag($name: String!) {
        createTag(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_TAG = gql`
    mutation updateTag($name: String!, $id: Int!) {
        updateTag(name: $name, id: $id) {
            id
            name
        }
    }
`;

export const DELETE_TAG = gql`
    mutation deleteTag($id: Int!) {
        deleteTag(id: $id) {
            id
            name
        }
    }
`;

export const LOAD_PAGINATED_TAGS = gql`
    query tags($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        tags(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
        }
        tagCount(search: $search) {
            total
        }
    }
`;

export const LOAD_TAG_BY_ID = gql`
    query tag($id: Int!) {
        tag(id: $id) {
            id
            name
        }
    }
`;
