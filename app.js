let express = require('express');
let app = express();
let cors = require('cors');
let User = require('./models/User');
let mongoose = require('mongoose');

require('dotenv').config();
//#region Server config

app.use(
   cors({
      origin: process.env.CLIENT_ORGIN,
      allowedHeaders: ['Access-Control-Allow-Origin', 'content-type'],
      credentials: true,
   })
);
app.use(express.json());

//#endregion
app.get('/', (req, res) => {
   res.send('Works just fine');
});

app.post('/like-comment', (req, res) => {
   res.status(500).json({ message: 'route not set up yet' });
});

app.get('/getemail', async (req, res) => {
   res.status(500).json({ message: 'route not set up yet' });

   /* let userId = req.session.getUserId();
   let user = await ThirdPartyEmailPassword.getUserById(userId);
   let email = user.email;
   res.status(200).json(email); */
});

app.post('/user', (req, res) => {
   let uid = req.body.token;

   User.findOne({ uid: uid })
      .then(user => {
         console.log('User found');
         console.log(`Finding user route ${uid}`);
         console.log(user);
         res.status(200).json({ productivity: user.productivity });
      })
      .catch(err => {
         console.error('User not found');
         User.create({ uid: uid, productivity: 0 })
            .then(user => {
               res.status(200).json(user);
            })
            .catch(err => {
               console.error('Something went wrong');
               console.error(err);
               res.status(500).json(err);
            });
      });
});

app.post('/setProductivity', (req, res) => {
   let { token, newProductivity } = req.body;
   User.findOneAndUpdate({ uid: token }, { productivity: newProductivity })
      .then(user => {
         res.status(200).json(true);
      })
      .catch(err => {
         res.status(500).json(err);
      });
});

console.log(
   `Server info\nServer Orgin: ${process.env.SERVER_ORGIN}\nClient Orgin: ${process.env.CLIENT_ORGIN}`
);
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
