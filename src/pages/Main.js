import React, { useContext, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { Button, Grid, Rail, Segment, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import RecoCard from '../components/RecoCard'
import CreatePost from '../components/CreatePost'
import RightRail from '../components/RightRail'
import { FETCH_POSTS_QUERY } from '../util/graphql'





function Main() {

  const { user, context } = useContext(AuthContext);
  const { loading, data: { getPosts: posts} = {}, refetch} = useQuery(FETCH_POSTS_QUERY);

  const [createPost, setCreatePost] = useState(false);

  function showCreatePost() {
    setCreatePost(!createPost);
  }

  function addPost(post) {
    refetch();
  }


  return (
    <Grid centered columns={2}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Column>

        <Grid.Row>
          {loading? (
            <h1>Loading posts...</h1>
          ) : (

            <Transition.Group>
              {createPost && <CreatePost addPostFunc={addPost} className='create-post'/>}
              {posts && posts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                  <RecoCard post={post} del={false}/>
                </Grid.Column>
              ))}
            </Transition.Group>
          )}
        </Grid.Row>

        <Rail position='right'>
          <Segment>
            <RightRail />
          </Segment>
        </Rail>

        {user &&
          <Rail position='left' onClick={showCreatePost}>
            <Button color='teal'>Write some recommendations</Button>
          </Rail>
        }
      </Grid.Column>
    </Grid>
  )
}





export default Main;
