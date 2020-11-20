import React, { useState } from 'react'
import { Button, Grid, Transition } from 'semantic-ui-react'

import CreatePost from '../components/CreatePost'

function Enrollment(props) {

  const [posted, setPosted] = useState(false);

  const [createPost, setCreatePost] = useState(false);

  function addPost(post) {
    setPosted(true);
  }

  const styles = {
    padding: 5
  }

  return (
    <Grid centered columns={2}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Column>
        Welcome to Pay it Forward! A couple guidelines before you write your first recommendations:
        <ul>
          <li style={styles}>
            Try to <strong>recommend things others might not know</strong> - recs that are local, up and coming, or from a cool cultural background are awesome!
          </li>
          <li style={styles}>
            Each post should be in a <strong>single category</strong>, you can write up to 5 recommendations per post, and you can make more posts from the Main page or your Home page
          </li>
          <li style={styles}>
            <strong>Don't recommend yourself</strong>, ask your mom to get an account and do that for you
          </li>
          <li style={styles}>
            We want to be a positive community, please don't write rude recommendations or descriptions
          </li>
        </ul>
        <Button color='teal' onClick={() => {setCreatePost(true)}}>I'm with you</Button>
        <Transition.Group>
          {createPost && <CreatePost addPostFunc={addPost} />}
          {posted && <h3>Congrats! You submitted your first post!</h3>}
          {posted &&
            <a href='/'>
              <Button color='teal'>Click here to go to the main page</Button>
            </a>
          }
        </Transition.Group>
      </Grid.Column>
    </Grid>
  )
}





export default Enrollment;
