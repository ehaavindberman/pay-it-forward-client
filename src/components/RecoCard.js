import React, { useContext } from 'react'
import { Button, Card, Icon, Image, Label, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import RecoInPost from './RecoInPost'
import CategoryButton from './CategoryButton'
import { tagIconOptions } from '../util/tags'

function RecoCard({post: { id, createdAt, username, likes, likeCount, recs }, delType, delFunc, trashFunc}) {

  const deleteFunction = (id) => {
    delFunc(id);
  }

  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image floated='left' size='mini' as={Link} to={`/user/${username}`}
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        {delFunc ?
          <Card.Meta>
            <p>{moment(createdAt).fromNow()}</p>
          </Card.Meta>
          :
          <Card.Meta as={Link} to={ `/recs/${id}`}>
            <p>{moment(createdAt).fromNow()}</p>
          </Card.Meta>
        }

        {recs.length > 0  && <CategoryButton tag={recs[0].tag} />}
        <List>
          {recs.length > 0 && recs.map(rec => (
            <RecoInPost
              delFunc={delFunc}
              key={rec.id}
              rec={{id: rec.id, reco: rec.text, desc: rec.description}}
            />
          ))}
        </List>
      </Card.Content>
      <Card.Content extra>
      {delFunc ?
        <Button as='div' labelPosition='right'>
          <Button color='teal' basic><Icon name='heart' /></Button>
          <Label basic color='teal' pointing='left'>{0}</Label>
        </Button>
        :
        <LikeButton user={user} post={{ id, likes, likeCount}}/>
      }

      {delFunc ?
        <Button onClick={trashFunc} as="div" color='red' floated='right'>
          <Icon name='trash' style={{ margin:0 }}/>
        </Button>
        : user && user.username === username
        && <DeleteButton postId={id} username={username} type={delType}
      />}
      </Card.Content>
    </Card>
  )
}

export default RecoCard;
