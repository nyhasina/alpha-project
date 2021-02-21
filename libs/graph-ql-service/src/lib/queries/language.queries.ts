import { gql } from '@apollo/client';

export const LOAD_LANGUAGE_BY_ID = gql`
    query language($id: Int!) {
        language(id: $id) {
            id
            code
            label
        }
    }
`;

export const LOAD_LANGUAGES = gql`
    query languages {
        languages {
            id
            code
            label
        }
    }
`;

export const CREATE_LANGUAGE = gql`
    mutation createLanguage($code: String!, $label: String) {
        createLanguage(code: $code, label: $label) {
            id
            code
            label
        }
    }
`;

export const UPDATE_LANGUAGE = gql`
    mutation updateLanguage($code: String!, $label: String, $id: Int!) {
        updateLanguage(code: $code, label: $label, id: $id) {
            id
            code
            label
        }
    }
`;

export const DELETE_LANGUAGE = gql`
    mutation deleteLanguage($id: Int!) {
        deleteLanguage(id: $id) {
            id
            code
            label
        }
    }
`;
