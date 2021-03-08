import { gql } from '@apollo/client';

export const CREATE_TOURNAMENT_REWARD = gql`
    mutation createTournamentReward($name: String!, $code: String!) {
        createTournamentReward(name: $name, code: $code) {
            id
            name
        }
    }
`;

export const UPDATE_TOURNAMENT_REWARD = gql`
    mutation updateTournamentReward($name: String!, $code: String!, $id: Int!) {
        updateTournamentReward(name: $name, code: $code, id: $id) {
            id
            name
        }
    }
`;

export const DELETE_TOURNAMENT_REWARD = gql`
    mutation deleteTournamentReward($id: Int!) {
        deleteTournamentReward(id: $id) {
            id
        }
    }
`;

export const LOAD_TOURNAMENT_REWARD = gql`
    query loadTournamentRewardById($id: Int!) {
        tournament-reward(id: $id) {
            id
            name
        }
    }
`;

export const LOAD_TOURNAMENT_REWARDS = gql`
    query tournament-rewards($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        tournament-rewards(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
        }
        tournamentRewardCount(search: $search) {
            total
        }
    }
`;
