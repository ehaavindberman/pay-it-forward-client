import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Grid, Rail, Segment, Sticky, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import RecoCard from '../components/RecoCard'
import CreatePost from '../components/CreatePost'
import { FETCH_POSTS_QUERY } from '../util/graphql'


function Enrollment(props) {

  const { user, context } = useContext(AuthContext);

  const [createPost, setCreatePost] = useState(false);

  function showCreatePost() {
    setCreatePost(!createPost);
  }

  function addPost(post) {
    setInterval(goToMain(),500);
  }

  function goToMain() {
    props.history.push('/');
  }


  return (
    <Grid centered columns={2}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Column>
        Welcome to Pay it Forward! A couple guidelines before you write your first recommendations:
        <ul>
          <li>
            Try to recommend things other might not know - recs that are local, up and coming, or from a cool cultural background are awesome!
          </li>
          <li>
            Each post should be in a single category, you can write up to 5 recommendations per post, and you can make more posts from the Main page or your Home page
          </li>
          <li>
            Don't recommend yourself, ask your mom to get an account and do that for you
          </li>
          <li>
            We want to be a positive community, please don't write rude recommendations or descriptions
          </li>
        </ul>
        <Button color='teal' onClick={() => {setCreatePost(true)}}>I'm with you</Button>
        {createPost && <CreatePost addPostFunc={addPost} />}
      </Grid.Column>
    </Grid>
  )
}





export default Enrollment;
