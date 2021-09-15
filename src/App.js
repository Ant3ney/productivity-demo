import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserData from './components/Dashbord';
import React from 'react';
import LandingPage from './Pages/Landing';
import Navbar from './components/Navbar';
import getWebOrgins from './utilities/getWebOrgins';
import { Auth0Provider } from '@auth0/auth0-react';

const { WEBSITE_DOMAIN, API_WEBSITE_DOMAIN } = getWebOrgins;
/* let user = await ThirdPartyEmailPassword.getUserById(userId); */

console.log(
   `Website domain details\nWebsite Domain: ${WEBSITE_DOMAIN}\nAPI Website Domain: ${API_WEBSITE_DOMAIN}`
);

class App extends React.Component {
   constructor(props) {
      super(props);
      const MyContext = React.createContext(/* defaultValue */);
   }

   render() {
      return (
         <div className='app'>
            <Router>
               <Auth0Provider
                  domain='dev-zguv3jce.us.auth0.com'
                  clientId='gDDLWZceYHP8vybczEOEaIQDArPlYQC0'
                  redirectUri={`${WEBSITE_DOMAIN}/callback`}
                  cacheLocation='localstorage'
               >
                  <Navbar />
                  <Switch>
                     <Route path='/productivity'>
                        <UserData />
                     </Route>
                     <Route path='/'>
                        <LandingPage />
                     </Route>
                  </Switch>
               </Auth0Provider>
            </Router>
         </div>
      );
   }
}

export default App;
