import { useState, useEffect } from 'react';
import { signOut } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session, {
   useSessionContext,
} from 'supertokens-auth-react/recipe/session';
import axios from 'axios';
import Dashbord from './Material/Dashboard';
import { Box, Typography, Button, CircularProgress } from '@material-ui/core';
import getWebOrgins from '../utilities/getWebOrgins';

Session.addAxiosInterceptors(axios);

export default function UserData() {
   let [productivity, setProductivity] = useState(null);
   let [userEmail, setUserEmail] = useState('Loading Email');
   let [productivitySave, setProductivitySave] = useState('Loading');
   let [initingProductivityLevel, setInitingProductivityLevel] = useState(0);
   const { API_WEBSITE_DOMAIN } = getWebOrgins();

   useEffect(() => {
      getInitialProductivity();
      getUserEmail();
   }, []);

   useEffect(() => {
      if (initingProductivityLevel === 2) {
         setProductivitySave('Updating Server');
         setServerProductivity();
      } else if (initingProductivityLevel === 1) {
         setProductivitySave('Saved');
      }
      if (initingProductivityLevel !== 2) {
         setInitingProductivityLevel(initingProductivityLevel + 1);
      }
   }, [productivity]);

   console.log(useSessionContext());

   function ProductivitySaveDisplay() {
      if (productivitySave === 'Loading') {
         return <CircularProgress style={{ margin: 'auto' }} />;
      } else {
         return <></>;
      }
   }

   return (
      <div className='user-data-container'>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h5' color='primary'>
               Logged in with {userEmail}
            </Typography>
         </Box>
         <Box mt={2} mx={4}>
            <Typography component='p' variant='h6' color='primary'>
               You are {productivity || productivity === 0 ? productivity : 0}{' '}
               productive
            </Typography>
         </Box>
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
                  signOut();
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
      setUserEmail(email);
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
