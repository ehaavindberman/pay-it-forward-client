import React, { useState } from 'react'
import { Button, Card, Icon, Form, Select } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { useForm } from '../util/hooks'

function RecoInPost({rec: { id, reco, desc, tag }, del, delFunc}) {

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
          {del &&
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
