import niceBg from '../../assets/niceBg.svg';
import {
   Typography,
   AppBar,
   Toolbar,
   Box,
   Button,
   Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function LandingPage() {
   const { loginWithRedirect } = useAuth0();
   return (
      <div className='landing-container'>
         <img className='niceBg' src={niceBg} />
         <div className='inner-container'>
            <Box mt={2} mx={4}>
               <Typography variant='h2' align='center'>
                  Enhance your productivity
               </Typography>
            </Box>
            <Box display='flex' mt={6}>
               <Button
                  style={{
                     margin: 'auto',
                     color: 'black',
                     height: '3rem',
                     width: '12rem',
                     border: '1px solid gray',
                  }}
                  onClick={() => loginWithRedirect()}
               >
                  Get Started
               </Button>
            </Box>
         </div>
      </div>
   );
}
