import { gql } from '@apollo/client';

export const CREATE_TOURNAMENT = gql`
    mutation createTournament(
        $name: String!
        $date: String
        $closed: Boolean
        $tournamentType: Int!
        $rules: [Int!]
        $format: Int!
        $teams: [Int!]
        $rounds: [Int!]
    ) {
        createTournament(
            name: $name
            date: $date
            closed: $closed
            tournamentType: $tournamentType
            rules: $rules
            format: $format
            teams: $teams
            rounds: $rounds
        ) {
            id
            name
            date
            closed
            tournamentType {
                id
                name
                reward {
                    id
                    name
                }
            }
            rules {
                id
                name
                content
            }
            format {
                id
                name
                code
            }
            teams {
                id
                name
            }
            rounds {
                id
                rank
                matchs {
                    id
                    rank
                    teamA {
                        id
                        name
                    }
                    teamB {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const UPDATE_TOURNAMENT = gql`
    mutation updateTournament(
        $name: String!
        $date: String
        $closed: Boolean
        $tournamentType: Int!
        $rules: [Int!]
        $format: Int!
        $teams: [Int!]
        $rounds: [Int!]
        $id: Int!
    ) {
        updateTournament(
            name: $name
            date: $date
            closed: $closed
            tournamentType: $tournamentType
            rules: $rules
            format: $format
            teams: $teams
            rounds: $rounds
            id: $id
        ) {
            id
            name
            date
            closed
            tournamentType {
                id
                name
                reward {
                    id
                    name
                }
            }
            rules {
                id
                name
                content
            }
            format {
                id
                name
                code
            }
            teams {
                id
                name
            }
            rounds {
                id
                rank
                matchs {
                    id
                    rank
                    teamA {
                        id
                        name
                    }
                    teamB {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const DELETE_TOURNAMENT = gql`
    mutation deleteTournament($id: Int!) {
        deleteTournament(id: $id) {
            id
            name
            date
            closed
            tournamentType {
                id
                name
                reward {
                    id
                    name
                }
            }
            rules {
                id
                name
                content
            }
            format {
                id
                name
                code
            }
            teams {
                id
                name
            }
            rounds {
                id
                rank
                matchs {
                    id
                    rank
                    teamA {
                        id
                        name
                    }
                    teamB {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const LOAD_TOURNAMENT = gql`
    query tournament($id: Int!) {
        tournament(id: $id) {
            id
            name
            date
            closed
            tournamentType {
                id
                name
                reward {
                    id
                    name
                }
            }
            rules {
                id
                name
                content
            }
            format {
                id
                name
                code
            }
            teams {
                id
                name
            }
            rounds {
                id
                rank
                matchs {
                    id
                    rank
                    teamA {
                        id
                        name
                    }
                    teamB {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const LOAD_TOURNAMENTS = gql`
    query tournaments($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        tournaments(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
            date
            closed
            tournamentType {
                id
                name
                reward {
                    id
                    name
                }
            }
            rules {
                id
                name
                content
            }
            format {
                id
                name
                code
            }
            teams {
                id
                name
            }
            rounds {
                id
                rank
                matchs {
                    id
                    rank
                    teamA {
                        id
                        name
                    }
                    teamB {
                        id
                        name
                    }
                }
            }
        }
        tournamentCount(search: $search) {
            total
        }
    }
`;
