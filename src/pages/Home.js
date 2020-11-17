import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Divider, Grid, Image, Rail, Segment, Transition } from 'semantic-ui-react'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import CreatePost from '../components/CreatePost'
import RecoCard from '../components/RecoCard'
import { FETCH_POSTS_BY_USER_QUERY } from '../util/graphql'
// fetch posts by user here


function Home(props) {

  const { user } = useContext(AuthContext);

  const userPageUsername = props.match.params.username;

  const { loading, data: { getPostsByUser: posts} = {} } = useQuery(FETCH_POSTS_BY_USER_QUERY, {
    variables: {username: userPageUsername}
  });

  return (
    <Grid centered columns={2}>
    <Grid.Row className="page-title">
      <h1>{user.username === userPageUsername ?  'Your' : userPageUsername+'\'s'} Home Page</h1>
    </Grid.Row>
      <Grid.Column>
        <Segment>
          {user && user.username === userPageUsername && <CreatePost />}
          <Divider horizontal>
            {user.username === userPageUsername ?  'Your' : userPageUsername+'\'s'} Posts
            </Divider>
          {loading? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {posts && posts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                  <RecoCard post={post} del={false} delType={'home'}/>
                </Grid.Column>
              ))}
            </Transition.Group>
          )}

          <Rail position='right' size='small'>
            <Segment>Right Rail Content</Segment>
          </Rail>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Home;
