import { AppBar, Toolbar, Box } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
   let { logout, loginWithRedirect } = useAuth0();
   return [
      <AppBar className='navbar' position='static' key={0}>
         <Toolbar className='inner-navbar'>
            <Box mr={2}>
               <Link to='/'>
                  <h3>Productivity Enhancer</h3>
               </Link>
            </Box>
            <Box ml={'auto'}>
               <a
                  onClick={() => {
                     loginWithRedirect();
                  }}
               >
                  Make acount
               </a>
            </Box>
            <Box ml={2}>
               <a
                  onClick={() => {
                     logout({ returnTo: window.location.origin });
                  }}
               >
                  Sign Out
               </a>
            </Box>
            <Box ml={2}>
               <Link to='/productivity'>My Productivity</Link>
            </Box>
         </Toolbar>
      </AppBar>,
      <div className='padder' key={1}></div>,
   ];
}
