import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashbord from './Material/Dashboard';
import { Box, Typography, Button, CircularProgress } from '@material-ui/core';
import getWebOrgins from '../utilities/getWebOrgins';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import App from '../App';

export default function UserData() {
   let [productivity, setProductivity] = useState(null);
   let [productivitySave, setProductivitySave] = useState('Loading');
   let [projectStage, setProjectStage] = useState('awake');
   let [userToken, setUserToken] = useState(null);
   let [runOnce, setRunOnce] = useState(true);
   let [getProductivityLoading, setGetProductivityLoading] = useState(true);

   const { user, isAuthenticated, isLoading, logout } = useAuth0();

   const { API_WEBSITE_DOMAIN, WEBSITE_DOMAIN } = getWebOrgins;

   useEffect(async () => {
      if (isAuthenticated && user && userToken && runOnce) {
         setRunOnce(false);

         console.log(user);
         axios
            .post(`${API_WEBSITE_DOMAIN}/user`, {
               token: user.sub,
            })
            .then(retUser => {
               console.log('Fetch worked');
               console.log(retUser);
               if (!retUser || !retUser.data) {
                  Promise.reject({ message: 'No data came back' });
               }
               setProductivity(retUser.data.productivity);
               setGetProductivityLoading(false);
               setProductivitySave('Server is up to date');
            })
            .catch(err => {
               console.error('get user via post failed');
               console.error(err);
            });
      }
   }, [isAuthenticated, user, userToken]);

   useEffect(() => {
      if (
         productivitySave === 'Server is up to date' ||
         productivitySave === 'Changes detected'
      ) {
         setProductivitySave('Changes detected');

         let scedualUpdateRefrence = setTimeout(() => {
            setProductivitySave('Updating Server');
            axios
               .post(`${API_WEBSITE_DOMAIN}/setProductivity`, {
                  token: user.sub,
                  newProductivity: productivity,
               })
               .then(confermation => {
                  setProductivitySave('Server is up to date');
               })
               .catch(err => {
                  console.error('get user via post failed');
                  console.error(err);
               });
         }, 2000);
         return () => {
            clearTimeout(scedualUpdateRefrence);
         };
      }
   }, [productivity]);

   useAuth0()
      .getAccessTokenSilently()
      .then(res => {
         setUserToken(res);
      })
      .catch(err => {
         console.error('Failed to get token');
         console.error(err);
      });

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

   if (isLoading) {
      return (
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h5' color='primary'>
               Loading user info
            </Typography>
         </Box>
      );
   } else if (!isAuthenticated) {
      console.log('You must sign up first');
      return <Redirect to='/' />;
   }
   return (
      <div className='user-data-container'>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h5' color='primary'>
               {text}
            </Typography>
         </Box>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h6' color='primary'>
               You are {productivity || productivity === 0 ? productivity : 0}{' '}
               productive
            </Typography>
         </Box>
         {!getProductivityLoading ? (
            <Box mt={2} mx={4}>
               <Button
                  onClick={() => {
                     setProductivity(productivity + 1);
                  }}
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
         ) : (
            <></>
         )}
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
               onClick={() => {
                  logout({ returnTo: window.location.origin });
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
