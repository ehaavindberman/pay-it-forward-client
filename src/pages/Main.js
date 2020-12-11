import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Grid, Rail, Segment, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import RecoCard from '../components/RecoCard'
import CreatePost from '../components/CreatePost'
import RightRail from '../components/RightRail'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Main() {

  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts} = {}, refetch} = useQuery(FETCH_POSTS_QUERY);

  const [createPost, setCreatePost] = useState(false);

  function showCreatePost() {
    setCreatePost(!createPost);
  }

  function addPost(post) {
    refetch();
  }

  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>

        <Grid.Column computer={11} mobile={16}>
          {loading? (
            <h1>Loading posts...</h1>
          ) : (

            <Transition.Group>
              {createPost && <CreatePost addPostFunc={addPost} className='create-post'/>}
              {posts && posts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: 20, flexGrow:1}}>
                  <RecoCard post={post} del={false}/>
                </Grid.Column>
              ))}
            </Transition.Group>
          )}

          <Rail only="computer" className="mobile hidden" position='right'>
              <Segment>
                {user &&
                  <Button color='teal' onClick={showCreatePost}>
                    Write some recommendations
                  </Button>
                }
                <RightRail />
              </Segment>
          </Rail>

        </Grid.Column>

      </Grid.Row>
    </Grid>
  )
}





export default Main;
