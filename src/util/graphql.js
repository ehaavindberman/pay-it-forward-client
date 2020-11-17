import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      createdAt
      username
      likeCount
      likes {
        username
      }
      recs {
        tag
        description
        text
        link
        id
      }
    }
  }
`;

export const FETCH_POSTS_BY_USER_QUERY = gql`
  query getPostsByUser($username: String!) {
    getPostsByUser(username: $username) {
      id
      createdAt
      username
      likeCount
      likes {
        username
      }
      recs {
        tag
        description
        text
        link
        id
      }
    }
  }
`;
