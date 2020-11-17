import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Divider, Grid, Image, Rail, Segment, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

function Stats(props) {

  const { user } = useContext(AuthContext);

  const tag = props.match.params.tag;


  return (
    <div>
      <h1>{tag}</h1>
      <h3>Coming soon...</h3>
    </div>
  )
}



export default Stats;
