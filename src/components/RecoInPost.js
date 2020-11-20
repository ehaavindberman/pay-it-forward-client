import React} from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'

function RecoInPost({rec: { id, reco, desc, tag }, delFunc}) {

  const items = [
    {
      header: reco,
      description: desc,
      meta: tag,
    }
  ];

  return (
    <Card>
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
        <Card.Description content={desc} />
      </Card.Content>
    </Card>
  )
}




export default RecoInPost;
