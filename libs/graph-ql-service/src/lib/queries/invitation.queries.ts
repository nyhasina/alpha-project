import { gql } from '@apollo/client';

export const LOAD_INVITATION_BY_ID = gql`
    query invitation($id: Int!, $take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        invitation(id: $id) {
            id
            sender {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            receiver {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            team {
                id
                name
            }
            date
            status
        }
        senders: users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            profile {
                id
                firstname
                lastname
                username
            }
        }
        receivers: users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            profile {
                id
                firstname
                lastname
                username
            }
        }
        teams(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
        }
    }
`;

export const LOAD_PAGINATED_INVITATIONS = gql`
    query invitations($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        invitations(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            sender {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            receiver {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            team {
                id
                name
            }
            date
            status
        }
        invitationCount(search: $search) {
            total
        }
    }
`;

export const CREATE_INVITATION = gql`
    mutation createInvitation($sender: Int!, $receiver: Int!, $team: Int!, $date: String, $status: String) {
        createInvitation(sender: $sender, receiver: $receiver, team: $team, date: $date, status: $status) {
            id
            sender {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            receiver {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            team {
                id
                name
            }
            date
            status
        }
    }
`;

export const UPDATE_INVITATION = gql`
    mutation updateInvitation($sender: Int!, $receiver: Int!, $team: Int!, $date: String, $status: String, $id: Int!) {
        updateInvitation(sender: $sender, receiver: $receiver, team: $team, date: $date, status: $status, id: $id) {
            id
            sender {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            receiver {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            team {
                id
                name
            }
            date
            status
        }
    }
`;

export const DELETE_INVITATION = gql`
    mutation deleteInvitation($id: Int!) {
        deleteInvitation(id: $id) {
            id
            sender {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            receiver {
                id
                profile {
                    id
                    firstname
                    lastname
                    username
                }
            }
            team {
                id
                name
            }
            date
            status
        }
    }
`;

export const LOAD_INVITATION_DEPENDENCIES = gql`
    query invitationDependencies($take: Int, $skip: Int, $by: String, $direction: String, $search: String) {
        senders: users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            profile {
                id
                firstname
                lastname
                username
            }
        }
        receivers: users(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            profile {
                id
                firstname
                lastname
                username
            }
        }
        teams(take: $take, skip: $skip, by: $by, direction: $direction, search: $search) {
            id
            name
        }
    }
`;
