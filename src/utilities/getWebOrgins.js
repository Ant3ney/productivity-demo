import isDeployed from './isDeployed';

return {
   WEBSITE_DOMAIN: isDeployed()
      ? 'https://productivity-demo-client01.netlify.app'
      : 'http://localhost:3000',
   API_WEBSITE_DOMAIN: isDeployed()
      ? 'https://productivity-server-demo01.herokuapp.com'
      : 'http://localhost:3005',
};
