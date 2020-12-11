import React, { useState } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'

function RecoInPost({rec: { id, reco, desc, tag }, delFunc}) {

  const [showMore, setShowMore] = useState(false);
  const smallDesc = desc.substring(0,100);

  function toggleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Button.Group floated='right'>
          {delFunc &&
            <Button onClick={() => delFunc(id)}>
              <Icon name='delete'/>
            </Button>
          }
        </Button.Group>
        <Card.Header content={reco} />
        <Card.Meta content={tag} />
        <Card.Description>
          {showMore? desc : smallDesc}
          {desc.length > 100 &&
            <a onClick={toggleShowMore}>{showMore? " show less":"... show more"}</a>
          }
        </Card.Description>
      </Card.Content>
    </Card>
  )
}




export default RecoInPost;
