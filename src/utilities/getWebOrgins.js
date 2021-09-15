import isDeployed from './isDeployed';

export default {
   WEBSITE_DOMAIN: isDeployed()
      ? 'https://auth0-client-demo01.netlify.app'
      : 'http://localhost:3000',
   API_WEBSITE_DOMAIN: isDeployed()
      ? 'https://auth0-productivity-demo01.herokuapp.com'
      : 'http://localhost:3005',
};
