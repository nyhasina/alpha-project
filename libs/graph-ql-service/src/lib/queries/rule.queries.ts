import { gql } from '@apollo/client';

export const CREATE_RULE = gql`
    mutation createRule($name: String!, $content: String!) {
        createRule(name: $name, content: $content) {
            id
            name
            content
        }
    }
`;

export const UPDATE_RULE = gql`
    mutation updateRule($name: String!, $content: String!, $id: Int!) {
        updateRule(name: $name, content: $content, id: $id) {
            id
            name
            content
        }
    }
`;

export const DELETE_RULE = gql`
    mutation deleteRule($id: Int!) {
        deleteRule(id: $id) {
            id
        }
    }
`;

export const LOAD_RULE = gql`
    query loadRuleById($id: Int!) {
        rule(id: $id) {
            id
            name
            content
        }
    }
`;

export const LOAD_RULES = gql`
    query rules($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        rules(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
            content
        }
        ruleCount(search: $search) {
            total
        }
    }
`;
