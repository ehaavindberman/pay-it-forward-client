import React from 'react';
import { Icon, Header, Label, List, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { tagIconOptions, tagOptions } from '../util/tags';
import CategoryButton from './CategoryButton';

function RightRail() {
  return (
    <List>
      <Header as='h3'> See what others recommend </Header>
      {true && tagOptions.map(tag => (
        <li className="right-rail-cat" key={tag.value}>
          <CategoryButton tag={tag.value} />
        </li>
      ))}
    </List>
  )
}

export default RightRail;
