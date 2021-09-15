import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashbord from './Material/Dashboard';
import { Box, Typography, Button, CircularProgress } from '@material-ui/core';
import getWebOrgins from '../utilities/getWebOrgins';
import { useAuth0 } from '@auth0/auth0-react';
import createAuth0Client from '@auth0/auth0-spa-js';

export default function UserData() {
   let [productivity, setProductivity] = useState(null);
   let [productivitySave, setProductivitySave] = useState('Loading');
   const [userMetadata, setUserMetadata] = useState(null);

   const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
      useAuth0();

   const { API_WEBSITE_DOMAIN, WEBSITE_DOMAIN } = getWebOrgins;

   console.log(useAuth0());

   useEffect(async () => {
      // either with async/await
      /* createAuth0Client({
         domain: 'dev-zguv3jce.us.auth0.com',
         client_id: 'gDDLWZceYHP8vybczEOEaIQDArPlYQC0',
      })
         .then(auth0 => {
            console.log(`auth0 below`);
            console.log(auth0);
         })
         .catch(err => {
            alert('Failed');
            console.error(err);
         }); */
   }, []);

   useAuth0()
      .getAccessTokenSilently()
      .then(res => {
         console.log(`Token: ${res}`);
      })
      .catch(err => {
         console.error('Failed');
         console.error(err);
      });

   useAuth0()
      .getIdTokenClaims()
      .then(res2 => {
         console.log('here');
         console.log(`Id Token Claims Below`);
         console.log(res2);
      })
      .catch(err => {
         console.error('Failed 2');
         console.error(err);
      });
   /*  useAuth0()
      .buildAuthorizeUrl()
      .then(res => {
         console.log(res);
      })
      .catch(); */

   function ProductivitySaveDisplay() {
      if (productivitySave === 'Updating Server') {
         return <CircularProgress style={{ margin: 'auto' }} />;
      } else if (productivitySave === 'Loading') {
         return <CircularProgress style={{ margin: 'auto' }} />;
      } else {
         return <></>;
      }
   }

   let text =
      isLoading || !isAuthenticated || !user
         ? 'Loading user info'
         : `Logged in with ${user.email}`;

   return (
      <div className='user-data-container'>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h5' color='primary'>
               {text}
            </Typography>
         </Box>
         <Box mt={2} mx={4}>
            <div>
               <h3>User Metadata</h3>
               {userMetadata ? (
                  <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
               ) : (
                  'No user metadata defined'
               )}
            </div>
         </Box>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h6' color='primary'>
               You are {productivity || productivity === 0 ? productivity : 0}{' '}
               productive
            </Typography>
         </Box>
         <Box mt={2} mx={4}>
            <Button
               onClick={() => {}}
               style={{
                  margin: 'auto',
                  color: 'black',
                  height: '3rem',
                  width: '12rem',
                  border: '1px solid gray',
               }}
            >
               Click here to be productive
            </Button>
         </Box>
         <Box
            mt={2}
            mx={4}
            width='max-content'
            display='flex'
            flexDirection='column'
         >
            <Typography component='p' variant='h6' color='primary'>
               Productivity Status
            </Typography>
            <Typography component='p' variant='h6' color='primary'>
               {productivitySave}
            </Typography>
            <ProductivitySaveDisplay />
         </Box>
         <Box mt={2} mx={4}>
            <Button
               onClick={async () => {
                  window.location.href = '/';
               }}
               style={{
                  margin: 'auto',
                  color: 'black',
                  height: '3rem',
                  width: '12rem',
                  border: '1px solid gray',
               }}
            >
               Sign Out
            </Button>
         </Box>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h6' color='primary' gutterBottom>
               Note, everything below this line is just for show
            </Typography>
         </Box>
         <hr
            style={{
               height: '2px',
               color: 'black',
               width: `100%`,
               backgroundColor: 'black',
            }}
         />
         <Dashbord className='' />
      </div>
   );

   async function getInitialProductivity() {
      // use axios as you normally do
      let response = await axios.get(`${API_WEBSITE_DOMAIN}/productivity`);
      let productivity = await response.data.productivity;
      setProductivity(productivity);
   }
   async function getUserEmail() {
      let response = await axios.get(`${API_WEBSITE_DOMAIN}/getemail`);
      let email = response.data;
      return email;
   }

   async function setServerProductivity() {
      let response = await axios.post(`${API_WEBSITE_DOMAIN}/setProductivity`, {
         newProductivity: productivity,
      });

      let wasSucessfull = response.data;
      if (wasSucessfull) {
         setProductivitySave('Saved');
      } else {
         setProductivitySave('Error occurred');
      }
   }
}
