import { AppBar, Toolbar, Box } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Navbar() {
   return [
      <AppBar className='navbar' position='static'>
         <Toolbar className='inner-navbar'>
            <Box mr={2}>
               <Link to='/'>
                  <h3>Productivity Enhancer</h3>
               </Link>
            </Box>
            <Box ml={'auto'}>
               <Link to='/auth'>Make acount</Link>
            </Box>
            <Box ml={2}>
               <Link to='/productivity'>My Productivity</Link>
            </Box>
         </Toolbar>
      </AppBar>,
      <div className='padder'></div>,
   ];
}
