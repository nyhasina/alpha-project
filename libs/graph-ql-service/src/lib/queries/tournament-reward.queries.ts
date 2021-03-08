import { gql } from '@apollo/client';

export const CREATE_TOURNAMENT_REWARD = gql`
    mutation createTournamentReward($name: String!) {
        createTournamentReward(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_TOURNAMENT_REWARD = gql`
    mutation updateTournamentReward($name: String!, $id: Int!) {
        updateTournamentReward(name: $name, id: $id) {
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
        tournamentReward(id: $id) {
            id
            name
        }
    }
`;

export const LOAD_TOURNAMENT_REWARDS = gql`
    query tournamentRewards($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        tournamentRewards(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
        }
        tournamentRewardCount(search: $search) {
            total
        }
    }
`;
