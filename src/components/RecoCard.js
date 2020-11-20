import React, { useContext } from 'react';
import { useQuery } from '@apollo/client'
import { Button, Card, Icon, Image, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import RecoInPost from './RecoInPost'
import CategoryButton from './CategoryButton'
import { tagIconOptions } from '../util/tags'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function RecoCard({post: { id, createdAt, username, likes, likeCount, recs, image }, delType, delFunc, trashFunc}) {

  const deleteFunction = (id) => {
    delFunc(id);
  }

  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getUserByUsername: author } = {},
    refetch } = useQuery(FETCH_USER_BY_USERNAME, {
      variables: {username: username}
    }
  );


  return (
    <Card fluid>
      <Card.Content>
      {loading ?
        <Image floated='left' size='mini' as={Link} to={`/user/${username}`}
        src={`https://react.semantic-ui.com/images/avatar/large/ade.jpg`} />
        :
        <Image floated='left' size='mini' as={Link} to={`/user/${username}`}
        src={`https://react.semantic-ui.com/images/avatar/large/${author.image}`} />
      }
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

const FETCH_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      image
    }
  }
`;

export default RecoCard;
