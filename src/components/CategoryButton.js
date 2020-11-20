import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { tagIconOptions } from '../util/tags';

function CategoryButton({ tag }) {

  return (
    <Label className='bg-color-tertiary' floated='left' as={Link} to={`/stats/${tag}`}>
      <Icon  name={tagIconOptions[tag]} />{tag}
    </Label>
  )
}

export default CategoryButton;
