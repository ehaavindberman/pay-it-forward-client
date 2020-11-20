import React from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Rail, Segment, Transition } from 'semantic-ui-react'

import TagStatChart from '../components/TagStatChart';
import RightRail from '../components/RightRail';
import { FETCH_RECS_BY_TAG_QUERY } from '../util/graphql';

function Stats(props) {

  const tag = props.match.params.tag;

  const {
    loading, data: { getRecsByTag: recs} = {}
  } = useQuery(FETCH_RECS_BY_TAG_QUERY, {
    variables: {tag}
  });

  return (
    <Grid centered columns={2}>
    <Grid.Row className="page-title">
      <h1>{tag}</h1>
    </Grid.Row>
      <Grid.Column>
        <Segment>
          {loading? (
            <h1>Loading stats...</h1>
          ) : (
            <Transition.Group>
              <TagStatChart data={recs}/>
            </Transition.Group>
          )}
          <Rail position='right' size='small'>
            <Segment>
              <RightRail />
            </Segment>
          </Rail>
          <Rail position='left' size='small'>
            <Segment>
            <h3>Hello! Eric here.</h3>
              <p>
                This stats page is in early alpha. As a former data analyst, I have a particular appreciation for the visualizations we can do with data and while currently we're only seeing the most popular recommendations, eventually I plan to include a personalized recommendation network, recommendation trends over time, and your friend's recommendations.
              </p>
              <p>
                I am currently using Recharts for charting because I don't have time to dig into a more robust data vis library that is compatible with React (although Airbnb's Visx is pretty promising, I'm waiting a bit on it because it is so new).
              </p>
              <p>
                Lots of work still to do, please let me know if you have any thoughts or comments via the contact me link in the footer
              </p>
            </Segment>
          </Rail>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Stats;
