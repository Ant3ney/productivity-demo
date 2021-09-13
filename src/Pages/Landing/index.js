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
export default function LandingPage() {
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
               >
                  <Link className='action' to='/auth'>
                     Get Started
                  </Link>
               </Button>
            </Box>
         </div>
      </div>
   );
}
