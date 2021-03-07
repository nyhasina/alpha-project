import { gql } from '@apollo/client';

export const CREATE_BLOG = gql`
    mutation createBlog($name: String!, $content: String, $cover: String, $video:String) {
        createBlog(name: $name, content: $content, cover: $cover, video: $video) {
            id
            name
        }
    }
`;

export const UPDATE_BLOG = gql`
    mutation updateBlog($name: String!, $content: String, $cover: String, $video: String) {
        updateBlog(name: $name, content: $content, cover: $cover, video: $video) {
            id
            name
            content
            cover
            video
        }
    }
`;

export const DELETE_BLOG = gql`
    mutation deleteBlog($id: Int!) {
        deleteBlog(id: $id) {
            id
        }
    }
`;

export const LOAD_BLOG = gql`
    query loadBlog($id: Int!) {
        blog(id: $id) {
            id
            name
            content
            cover
            video
        }
    }
`;