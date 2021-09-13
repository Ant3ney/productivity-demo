let express = require('express');
let app = express();
let supertokens = require('supertokens-node');
let Session = require('supertokens-node/recipe/session');
let ThirdPartyEmailPassword = require('supertokens-node/recipe/thirdpartyemailpassword');
let {
   middleware,
   errorHandler,
} = require('supertokens-node/framework/express');
let cors = require('cors');
let {
   verifySession,
} = require('supertokens-node/recipe/session/framework/express');
let User = require('./models/User');
let mongoose = require('mongoose');

require('dotenv').config();
//#region Server config

let { Google } = ThirdPartyEmailPassword;
supertokens.init({
   framework: 'express',
   supertokens: {
      connectionURI:
         'https://8ca80b8112d511eca856991b6ad2d234-us-east-1.aws.supertokens.io:3567',
      apiKey: 'zRxuzZoeKU7hMLglDcpkS2F4zOYAqg',
   },
   appInfo: {
      // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
      appName: 'ProductivityEnhance', // Example: "SuperTokens",
      apiDomain: process.env.SERVER_ORGIN, // Example: "https://api.supertokens.io",
      websiteDomain: process.env.CLIENT_ORGIN, // Example: "https://supertokens.io"
   },
   recipeList: [
      ThirdPartyEmailPassword.init({
         providers: [
            Google({
               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
               clientId: process.env.GOOGLE_CLIENT_ID,
            }),
         ],
      }),
      Session.init(), // initializes session features
   ],
});

app.use(
   cors({
      origin: process.env.CLIENT_ORGIN,
      allowedHeaders: [
         'Access-Control-Allow-Origin',
         'content-type',
         ...supertokens.getAllCORSHeaders(),
      ],
      credentials: true,
   })
);
app.use(express.json());
app.use(middleware());

//#endregion
app.get('/', (req, res) => {
   res.send('Works just fine');
});

app.post('/like-comment', verifySession(), (req, res) => {
   let userId = req.session.getUserId();
   res.send(userId);
   //....
});

app.get('/getemail', verifySession(), async (req, res) => {
   let userId = req.session.getUserId();
   let user = await ThirdPartyEmailPassword.getUserById(userId);
   let email = user.email;
   res.status(200).json(email);
});

app.post('/setProductivity', verifySession(), async (req, res) => {
   console.log('here');
   let userId = req.session.getUserId();
   let newProductivity = req.body.newProductivity;
   console.log(newProductivity);
   User.findOneAndUpdate({ uid: userId }, { productivity: newProductivity })
      .then(user => {
         res.status(200).json(true);
      })
      .catch(err => {
         console.error(err);
         res.status(500).json(false);
      });
});

app.get('/productivity', verifySession(), (req, res) => {
   let uid = req.session.getUserId();
   User.findOne({ uid: uid })
      .then(user => {
         console.log('User found');
         res.status(200).json({ productivity: user.productivity });
      })
      .catch(err => {
         console.error('User not found');
         User.create({ uid: uid, productivity: 0 })
            .then(() => {
               res.status(200).json(0);
            })
            .catch(err => {
               console.error('Something went wrong');
               console.error(err);
               res.status(500).json(err);
            });
      });
});

app.use(errorHandler());

app.listen(process.env.PORT, () => {
   let DELETE_ALL_USERS = false;
   console.log(`App is running on port: ${process.env.PORT}`);
   mongoose
      .connect(process.env.DBURL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then(() => {
         console.log('MongoDB has concected!');
         if (DELETE_ALL_USERS) {
            console.log('Deleting all users');
            utilities.deleteAllUsers();
         }
      })
      .catch(err => {
         console.log('Something went wrong');
         console.log(err);
      });
});
