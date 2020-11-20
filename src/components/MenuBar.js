import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function MenuBar(props) {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'main' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleLogOut = (e) => {
    setActiveItem('main');
    logout();
  }
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='main'
        active={activeItem === 'main' || activeItem === '/'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          as={Link}
          to='/'
          onClick={handleLogOut}
        />
        <Menu.Item
          name={user.username}
          active={activeItem === user.username}
          onClick={handleItemClick}
          as={Link}
          to={`/user/${user.username}`}
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='main'
        active={activeItem === 'main'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
