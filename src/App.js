import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import CreatePost from './components/CreatePost';
import Stats from './pages/Stats';
import About from './pages/About';
import Enrollment from './pages/Enrollment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
            <Route exact path='/' component={Main}/>
            <Route exact path='/create' component={CreatePost}/>
            <Route exact path='/user/:username' component={Home}/>
            <AuthRoute exact path='/login' component={Login}/>
            <AuthRoute exact path='/register' component={Register}/>
            <Route exact path='/recs/:postId' component={SinglePost}/>
            <Route exact path='/stats/:tag' component={Stats}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/enrollment' component={Enrollment}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
