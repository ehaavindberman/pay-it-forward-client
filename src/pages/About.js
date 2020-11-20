import React, { useContext } from 'react'
import { Grid, Segment, Icon } from 'semantic-ui-react'

function About() {

  return (
    <Grid centered columns={2}>
      <Grid.Row className="page-title">
        About
      </Grid.Row>
      <Grid.Column width={10}>
        <Segment>
          <h3>Thanks for stopping by!</h3>
          <p>
            This project could not have been done without the guidance of Classed and freeCodeCamp, huge thank you to both.
          </p>

          <h3>Project idea</h3>
          <p>
            The idea with Pay it forward (as I'm calling it for now) is to find and share recommendations for off the beaten path media makers from youtube creators to painters and everything in between. The idea came to me as I was playing a game a friend called "Around the world music" where everyone would add a song to the queue that they thought others wouldn't know and might like. With this in mind, the guiding principles of Pay it forward are sharing is caring, give it a try - you might like it, and we admire creators and artists from all walks of life and all around the world. Thank you for reading and coming to the site, I'm excited to see where this project goes!
          </p>

          <h3>The tech stack</h3>
          <p>
            For this project I used the MERNG stack (MongoDB, Express, React, Node.js, and GraphQL) and Semantic UI for most of the styling. This was my first exposure to React and GraphQL and there is plenty more to learn!
          </p>

          <h3>Next steps</h3>
          <p>
            I have documented many of my next steps in GitHub issues but the largest ones concern:
          </p>
          <ul>
            <li>
              allowing users more control of their data (a place to delete your profile for instance)
            </li>
            <li>
              design in general - since I'm learning semantic UI many of the pages are not very responsive
            </li>
            <li>
              working on the data science side to see who should get which recommendations
            </li>
            <li>
              polishing the recommendation submission backend for better structure
            </li>
            <li>
              ways of interacting with other users outside of liking posts
            </li>
            <li>
              and much more...
            </li>
          </ul>

          <h3>Contact info</h3>
          <p>
            If you want to get in contact, feel free to send me an email at ehaavindberman@gmail.com and here are links to my LinkedIn, GitHub, and haavindberman.com, my personal website!
          </p>
          <div className="centered-div">
            <a href='https://www.linkedin.com/in/eric-haavind-berman-617a735b/' target="_blank">
              <Icon className='color-primary' size='huge' name='linkedin'/>
            </a>
            <a href='https://github.com/ehaavindberman' target="_blank">
              <Icon className='color-primary' size='huge' name='github'/>
            </a>
            <a href='http://www.haavindberman.com' target="_blank">
              <Icon  className='color-primary' size='huge' name='home'/>
            </a>
          </div>

        </Segment>
      </Grid.Column>
    </Grid>
      // contact, link to haavindberman.com and about me
      // how the project was constructed link to github and the tutorial
      // include email send form
      // coming updates and known issues
  )
}



export default About;
