import React, { useState } from 'react'
import { Button, Card, Icon, Form, Select } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { useForm } from '../util/hooks'

function RecoInPost({rec: { reco, desc, tag }, del}, deleteFunction) {

  const items = [
    {
      header: reco,
      description: desc,
      meta: tag,
    }
  ];
  if (del) {
    console.log(deleteFunction);
  }
  return (
    <Card>
      <Card.Content>
        <Button.Group floated='right'>
          {del &&
            <Button onClick={deleteFunction}>
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
