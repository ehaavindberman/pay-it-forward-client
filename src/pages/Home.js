import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Divider, Grid, Rail, Segment, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import CreatePost from '../components/CreatePost'
import RecoCard from '../components/RecoCard'
import RightRail from '../components/RightRail'
import { FETCH_POSTS_BY_USER_QUERY } from '../util/graphql'


function Home(props) {

  const { user } = useContext(AuthContext);

  const userPageUsername = props.match.params.username;

  const {
    loading,
    data: { getPostsByUser: posts} = {},
    refetch } = useQuery(FETCH_POSTS_BY_USER_QUERY, {
      variables: {username: userPageUsername}
    }
  );

  function addPost() {
    refetch();
  }

  return (
    <Grid>
    <Grid.Row className="page-title">
      <h1>{(!user || user.username !== userPageUsername)
        ?  userPageUsername+'\'s' : 'Your'} Home Page</h1>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column computer={11} mobile={16}>
        <Segment>
          {(user && user.username === userPageUsername) && <CreatePost addPostFunc={addPost}/>}
          <Divider horizontal>
            {(user && user.username === userPageUsername) ?  'Your' : userPageUsername+'\'s'} Posts
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
          </Segment>

          <Rail className="mobile hidden" position='right'>
            <Segment>
              <RightRail />
            </Segment>
          </Rail>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Home;
