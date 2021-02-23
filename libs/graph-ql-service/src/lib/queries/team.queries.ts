import { gql } from '@apollo/client';

export const LOAD_TEAM_BY_ID = gql`
    query team($id: Int!, $take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        team(id: $id) {
            id
            name
            tag {
                id
                name
            }
            owner {
                id
                email
                password
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            members {
                id
                email
                password
            }
        }
        users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            email
            password
            profile {
                id
                firstname
                lastname
                username
                currency {
                    id
                    code
                    label
                }
                language {
                    id
                    code
                    label
                }
                deleted
            }
        }
    }
`;

export const LOAD_PAGINATED_TEAMS = gql`
    query teams($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        teams(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
            tag {
                id
                name
            }
            owner {
                id
                email
                password
                profile {
                    id
                    firstname
                    lastname
                    username
                }
                joinedTeams {
                    id
                    name
                }
            }
            members {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
        }
        teamCount(search: $search) {
            total
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation createTeam($name: String!, $tag: String, $members: [Int!], $owner: Int) {
        createTeam(name: $name, tag: $tag, members: $members, owner: $owner) {
            id
            name
            tag {
                id
                name
            }
            owner {
                id
                email
                password
                profile {
                    id
                    firstname
                    lastname
                    username
                    currency {
                        id
                        code
                        label
                    }
                    language {
                        id
                        code
                        label
                    }
                    currencyId
                    languageId
                    deleted
                }
                joinedTeams {
                    id
                    name
                    tag {
                        id
                        name
                    }
                    owner {
                        id
                        email
                        password
                    }
                    members {
                        id
                        email
                        password
                        profile {
                            id
                            firstname
                            lastname
                            username
                            currencyId
                            languageId
                            deleted
                        }
                        joinedTeams {
                            id
                            name
                        }
                    }
                }
            }
            members {
                id
                email
                password
            }
        }
    }
`;

export const UPDATE_TEAM = gql`
    mutation updateTeam($name: String!, $tag: String, $members: [Int!], $owner: Int, $id: Int!) {
        updateTeam(name: $name, tag: $tag, members: $members, owner: $owner, id: $id) {
            id
            name
            tag {
                id
                name
            }
            owner {
                id
                email
                password
                profile {
                    id
                    firstname
                    lastname
                    username
                    currency {
                        id
                        code
                        label
                    }
                    language {
                        id
                        code
                        label
                    }
                    currencyId
                    languageId
                    deleted
                }
                joinedTeams {
                    id
                    name
                    tag {
                        id
                        name
                    }
                    owner {
                        id
                        email
                        password
                    }
                    members {
                        id
                        email
                        password
                        profile {
                            id
                            firstname
                            lastname
                            username
                            currencyId
                            languageId
                            deleted
                        }
                        joinedTeams {
                            id
                            name
                        }
                    }
                }
            }
            members {
                id
                email
                password
            }
        }
    }
`;

export const DELETE_TEAM = gql`
    mutation deleteTeam($id: Int!) {
        deleteTeam(id: $id) {
            id
            name
            tag {
                id
                name
            }
            owner {
                id
                email
                password
                profile {
                    id
                    firstname
                    lastname
                    username
                    currency {
                        id
                        code
                        label
                    }
                    language {
                        id
                        code
                        label
                    }
                    currencyId
                    languageId
                    deleted
                }
                joinedTeams {
                    id
                    name
                    tag {
                        id
                        name
                    }
                    owner {
                        id
                        email
                        password
                    }
                    members {
                        id
                        email
                        password
                        profile {
                            id
                            firstname
                            lastname
                            username
                            currencyId
                            languageId
                            deleted
                        }
                        joinedTeams {
                            id
                            name
                        }
                    }
                }
            }
            members {
                id
                email
                password
            }
        }
    }
`;

export const LOAD_TEAM_DEPENDENCIES = gql`
    query loadTeamDependencies($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            email
            password
            profile {
                id
                firstname
                lastname
                username
                currency {
                    id
                    code
                    label
                }
                language {
                    id
                    code
                    label
                }
                deleted
            }
        }
    }
`;
