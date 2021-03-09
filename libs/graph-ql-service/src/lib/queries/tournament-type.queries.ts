import { gql } from '@apollo/client';

export const CREATE_TOURNAMENT_TYPE = gql`
    mutation createTournamentType($name: String!, $reward: Int!) {
        createTournamentType(name: $name, reward: $reward) {
            id
            name
            reward {
                id
                name
            }
        }
    }
`;

export const UPDATE_TOURNAMENT_TYPE = gql`
    mutation updateTournamentType($name: String!, $reward: Int!, $id: Int!) {
        updateTournamentType(name: $name, reward: $reward, id: $id) {
            id
            name
            reward {
                id
                name
            }
        }
    }
`;

export const DELETE_TOURNAMENT_TYPE = gql`
    mutation deleteTournamentType($id: Int!) {
        deleteTournamentType(id: $id) {
            id
        }
    }
`;

export const LOAD_TOURNAMENT_TYPE = gql`
    query tournamentTypeAndDependencies($id: Int!, $take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        tournamentType(id: $id) {
            id
            name
            reward {
                id
                name
            }
        }
        tournamentRewards(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
        }
    }
`;

export const LOAD_TOURNAMENT_TYPES = gql`
    query tournamentTypes($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        tournamentTypes(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
            reward {
                id
                name
            }
        }
        tournamentTypeCount(search: $search) {
            total
        }
    }
`;
