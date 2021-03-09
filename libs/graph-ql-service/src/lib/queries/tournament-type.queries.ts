import { gql } from '@apollo/client';

export const CREATE_TOURNAMENT_TYPE = gql`
    mutation createTournamentType($name: String!) {
        createTournamentType(name: $name) {
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
    mutation updateTournamentType($name: String!, $id: Int!) {
        updateTournamentType(name: $name, id: $id) {
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
    query loadTournamentTypeAndDependencies($id: Int, $take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
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
