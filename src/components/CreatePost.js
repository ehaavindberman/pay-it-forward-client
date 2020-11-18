import React, { useContext, useState } from 'react'
import { Button, Divider, Form, Select, Transition } from 'semantic-ui-react'
import { useMutation, useLazyQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth'
import RecoCard from '../components/RecoCard'
import { tagOptions } from '../util/tags'
import { FETCH_POSTS_QUERY, FETCH_POSTS_BY_USER_QUERY } from '../util/graphql'

function CreatePost(props) {
  const { user, context } = useContext(AuthContext);

  let showPostPreview = false;

  const [submittedRecs, setSubmittedRecs] = useState([]);
  const [form, setForm] = useState({reco: '', desc: '', tag: ''});
  const [errors, setErrors] = useState({});

  const onChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const [getPostsQuery,{ loading, data: { getPosts } = {}}] = useLazyQuery(FETCH_POSTS_QUERY);


  const [createPost] = useMutation(CREATE_POST_MUTATION);
  const [createReco] = useMutation(CREATE_RECO_MUTATION);
  const [addReco] = useMutation(ADD_RECO_MUTATION);

  function createAndAddReco(tag, postId, desc, text) {
    createReco({variables: {
      text,
      link: '',
      tag: tag,
    }}).then(
      (res) => {
        addReco({variables: {
          recoId: res.data.createReco.id,
          description: desc,
          postId:postId
        }});
      },
      (err) => {console.log(err);}
    );
  }

  function addRecoToPost(event) {
    event.preventDefault();
    showPostPreview = true;
    let errs = {};
    if (form.reco.trim() === '') {
      errs.reco = 'Type in a recommendation';
    }
    if (form.tag.trim() === '') {
      errs.tag = 'Must choose a category for recommendations'
    }
    if (submittedRecs.length > 0 && form.tag != submittedRecs[0].tag) {
      errs.tag = 'Category should be the same for all recommendations in a post';
      errs.tag2 = `You chose the category ${submittedRecs[0].tag}, to change, delete all recs`;
    }
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmittedRecs([
        ...submittedRecs,
        {
          id: submittedRecs.length,
          text: form.reco,
          description: form.desc,
          tag: form.tag
        }
      ]);
      form.reco = '';
      form.desc = '';
    }
  }

  function removeRecoFromPost(id) {
    if (submittedRecs.length === 1) {
      setSubmittedRecs([]);

    } else {
      setSubmittedRecs(submittedRecs.splice(id,1));
    }
  }

  function submitPost() {
    createPost().then(
      (res) => {
        for (let i=0; i < submittedRecs.length; i++) {
          createAndAddReco(
            form.tag,
            res.data.createPost.id,
            submittedRecs[i].description,
             submittedRecs[i].text
           )
        }
      },
      (err) => {console.log(err)}
    ).then( ()=> getPostsQuery()
    ).catch(console.error)

    setSubmittedRecs([]);

    console.log('submitted!');
  }

  return (
    <>
    <Divider horizontal>Create A New Post</Divider>
    <div className="form-container">
      <Form onSubmit={addRecoToPost} noValidate>
        <Form.Field
          control={Select}
          label='Category'
          name='tag'
          options={tagOptions}
          onChange={(event, {value}) => form.tag = value}
          placeholder='Category'
          style={{width: 10}}
          error={errors.tag ? true : false}
        />
        <div className='rec-input ui action input fluid'>
          <Form.Input
            type='text'
            label='Recommendation'
            placeholder='Recommendation..'
            name='reco'
            value={form.reco}
            onChange={onChange}
            error={errors.reco ? true : false}
          />
        </div>
        <div className="ui action input fluid">
          <Form.Input
            className='desc-input'
            type='text'
            label='Description'
            placeholder='Why do you recommend?'
            name='desc'
            value={form.desc}
            onChange={onChange}
          />
        </div>
        <div className='add-rec-button'>
        <Button.Group float='right'>
          <Button name='submit' type='submit' color='teal'
            className={submittedRecs.length < 5 ?  'active' : 'disabled'}
          >
            Add to post
          </Button>
        </Button.Group>
        </div>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className = "ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
    <Transition.Group animation={'fade down'} duration={500}>
      <Divider horizontal>New Post Preview</Divider>
      <RecoCard delFunc={removeRecoFromPost} del={true}
        post={{
          id: '0',
          createdAt: new Date(),
          username: user.username,
          likes: [],
          likeCount: 0,
          recs: submittedRecs
        }}
      />
      <Button
        onClick={submitPost}
        className={submittedRecs.length > 0 ?  'active' : 'disabled'}
        color='teal'
      >
        Post!
      </Button>
    </Transition.Group>
    </>
  )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost {
    createPost {
      id username createdAt likeCount
      likes {
        id username createdAt
      }
      recs {
        id tag text link description createdAt
      }
    }
  }
`;

const CREATE_RECO_MUTATION = gql`
  mutation createReco($text: String!, $link: String, $tag: String!) {
    createReco(text: $text, link: $link, tag: $tag) {
      id
      text
      link
      tag
      createdAt
    }
  }
`;

const ADD_RECO_MUTATION = gql`
  mutation addReco(
    $recoId: ID!,
    $description: String!,
    $postId: ID!
  ) {
    addReco(
      recoId: $recoId,
      description: $description,
      postId: $postId
    ) {
      id
      recs {
        id
        text
        link
        tag
        description
        createdAt
      }
      createdAt
      username
    }
  }
`;

export default CreatePost;
