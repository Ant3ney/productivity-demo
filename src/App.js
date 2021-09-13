import './App.css';
import { Google } from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import SuperTokens, {
   getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ThirdPartyEmailPassword, {
   ThirdPartyEmailPasswordAuth,
} from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import axios from 'axios';
import UserData from './components/Dashbord';
import React, { useState, useEffect } from 'react';
import LandingPage from './Pages/Landing';
import Navbar from './components/Navbar';
import isDeployed from './utilities/isDeployed';

Session.addAxiosInterceptors(axios);
const WEBSITE_DOMAIN = isDeployed()
   ? 'http://productivity-demo-client01.netlify.app'
   : 'http://localhost:3000';
const API_WEBSITE_DOMAIN = isDeployed()
   ? 'https://productivity-server-demo01.herokuapp.com'
   : 'http://localhost:3005';
/* let user = await ThirdPartyEmailPassword.getUserById(userId); */
SuperTokens.init({
   appInfo: {
      // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
      appName: 'Productivity Enhance', // Example: "SuperTokens",
      apiDomain: API_WEBSITE_DOMAIN, // Example: "https://api.supertokens.io",
      websiteDomain: WEBSITE_DOMAIN, // Example: "https://supertokens.io"
   },
   recipeList: [
      ThirdPartyEmailPassword.init({
         signInAndUpFeature: {
            providers: [Google.init()],
         },
      }),

      Session.init(),
   ],
});

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
               <Navbar />
               <Switch>
                  {getSuperTokensRoutesForReactRouterDom(
                     require('react-router-dom')
                  )}
                  <Route path='/productivity'>
                     <ThirdPartyEmailPasswordAuth>
                        <UserData />
                     </ThirdPartyEmailPasswordAuth>
                  </Route>
                  <Route path='/'>
                     <LandingPage />
                  </Route>
               </Switch>
            </Router>
         </div>
      );
   }
}

export default App;
