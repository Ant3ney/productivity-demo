# Auth0 Productivity App

Live app can be found at https://productivity-demo-client01.netlify.app

## Major issues

Inside the Auth0 docs on getting started with authentication via a react app, I did not find any mention of how to persist user authentication and the users data after refreshes. (local session would not store)

## Notes decisions and feedback

I Liked being able to customize the consent screen

It was tough to get login with redirect to work

I could not figure out how to keep the user data object from the useAuth hook to stay defined. When I refreshed the user data, it would not disappear until I logged in again.

To fix the above issue, I had to set cacheLocation = 'localstorage' for the Auth0Provider to save user data after refresh. This was not well documented.

Found it very convenient to have an option where I don’t have to use my google client id and secret.

I Appreciated being able to set my redirect url after logging out.
