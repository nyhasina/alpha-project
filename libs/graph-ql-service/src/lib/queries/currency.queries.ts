import { gql } from '@apollo/client';

export const LOAD_CURRENCY_BY_ID = gql`
    query currency($id: Int!) {
        currency(id: $id) {
            id
            code
            label
        }
    }
`;

export const LOAD_CURRENCIES = gql`
    query currencies {
        currencies {
            id
            code
            label
        }
    }
`;

export const CREATE_CURRENCY = gql`
    mutation createCurrency($code: String!, $label: String) {
        createCurrency(code: $code, label: $label) {
            id
            code
            label
        }
    }
`;

export const UPDATE_CURRENCY = gql`
    mutation updateCurrency($code: String!, $label: String, $id: Int!) {
        updateCurrency(code: $code, label: $label, id: $id) {
            id
            code
            label
        }
    }
`;

export const DELETE_CURRENCY = gql`
    mutation deleteCurrency($id: Int!) {
        deleteCurrency(id: $id) {
            id
            code
            label
        }
    }
`;
