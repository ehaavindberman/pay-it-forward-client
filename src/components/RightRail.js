import React from 'react';
import { Button, Header, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { tagOptions } from '../util/tags';
import CategoryButton from './CategoryButton';

function RightRail() {
  return (
    <List>
      <Header as='h3'> See what others recommend </Header>
      <hr />
      {true && tagOptions.map(tag => (
        <li className="right-rail-cat" key={tag.value}>
          <CategoryButton tag={tag.value} />
        </li>
      ))}
      <br />
      <Button as={Link} to={'/about'} fluid className='bg-color-secondary'>About this project</Button>
    </List>
  )
}

export default RightRail;
