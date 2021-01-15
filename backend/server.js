import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";
import endpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");
    const user = await User.findOne({ accessToken });
    if (!user) {
      throw "User not found";
    }
    req.user = user;
    next();
  } catch (err) {
    const errorMessage = "Please try loigging in again";
    res.status(401).json({ error: errorMessage });
  }
};

const User = mongoose.model("User", userSchema);

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(endpoints(app));
});

// Sign-up
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("!!!", name, email, password);
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    await user.save()
    res.status(201).json({ message: 'User created!', id: user._id, accessToken: user.accessToken })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user!', errors: err.errors })
  }
});

//Login
app.post("/sessions", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ userId: user._id, accessToken: user.accessToken });
      //compare passwords
    } else {
      res
        .status(404)
        .json({
          notFound: true,
          message: "Incorrect username and/or password",
        });
    }
  } catch (err) {
    res
      .status(404)
      .json({ notFound: true, message: "Incorrect username and/or password" });
  }
});

// Secure endpoint, user needs to be logged in to access this.

app.get("/users/:id/profile", authenticateUser);
app.get("/secret", async (req, res) => {
  const secretMessage = `This is a secret message for ${req.user.name}`;
  res.status(200).json({ secretMessage });
});
//get user specific info
app.get("/users/:id/profile", authenticateUser);
app.get("/users/:id/profile", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const secretMsgPrivate = `{Hello, ${user.name}, this secret message is for you.}`;
  const secretMsgPublic = `{Hello, ${user.name}, this public message is for you.}`;

  //Decide private or public
  if (req.user._id === user._id) {
    res.status(200).json({ secretMsgPrivate });
  } else {
    res.status(200).json({ secretMsgPublic });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import crypto from 'crypto';
// import bcrypt from 'bcrypt-nodejs';
// import endpoints from 'express-list-endpoints'

// const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/authAPI';
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = Promise;

// //add the check if the database is connected or not!!!

// const userSchema = new mongoose.Schema ({
//   name: {
//     type: String,
//     minlength: 5,
//     maxlength: 20,
//     unique: true,
//     required: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//     minlength: 6,
//     required: true,
//   },
//   accessToken: {
//     type: String,
//     default: () => crypto.randomBytes(128).toString('hex'),
//   },
// });
// //kind of useffect but for schema
// userSchema.pre("save", async function(next){
//   const user=this;

//   if(!user.isModified('password')){
//     return next();
//   }
//   const salt = bcrypt.genSaltSync(10);
//   //console.log(`PRE - password before has: ${user.password}`)
//   user.password = bcrypt.hashSync(user.passwood, salt);
//   //console.log(`PRE - password after has: ${user.password}`)

//   next();
// });

// const User = mongoose.model('User',userSchema);

// const authenticateUser = async (req, res, next) => {
//   try{
//     const accessToken = req.header('Authorization');
//     const user = await User.findOne( {accessToken });
//     if(!user) {
//       throw 'User not found'
//     }
//     req.user = user;
//     next()
//   } catch (err) {
//     const errorMessage = 'Please try logging in again';
//     console.log(errorMessage);
//     res.status(401).json( {error: errorMessage });
//   }
// }

// // const authenticateUser = async (req, res, next) => {
// //   try {
// //       const user = await User.findOne({ accessToken: req.header('Authorization') });
// //   if (user) {
// //     req.user = user;
// //     next();
// //   } else {
// //     res.status(401).json({ loggedOut: true, message: 'Please log in again' });
// //   }
// // } catch(err){
// //   res.status(403).json({message: 'Invalid access token or missing', errors: err})
// //   }
// // };

// // const authenticateUser = async (req, res, next) => {
// //   try {
// //       const user = await User.findOne({ accessToken: req.header('Authorization') });
// //   if (user) {
// //     req.user = user;
// //     next();
// //   } else {
// //     res.status(401).json({ loggedOut: true, message: 'Please log in again' });
// //   }
// // } catch(err){
// //   res.status(403).json({message: 'Invalide access token or missing', errors: err})
// //   }
// // };
// //   PORT=9000 npm start
// const port = process.env.PORT || 8080;
// const app = express();

// // Add middlewares to enable cors and json body parsing
// app.use(cors());
// app.use(bodyParser.json());

// // Start defining your routes here
// app.get('/', (req, res) => {
//   res.send(endpoints(app));
// });

// // Sign-up/ create a new user
// //i added email here
// app.post('/users', async (req, res) => {
//   try {
//     const { name, password, email } = req.body;
//     const user = await new User({
//       name,
//       password, 
//       email
//       }).save();
//       //we may have accessToken:user.accessToken missing here
//     res.status(200).json({ userId: user._id, accessToken: user.accessToken });
//   } catch (err) {
//     res.status(400).json({ message: 'Could not create user', errors: err });
//   }
// });

// //Login
// app.post('/sessions', async (req, res) => {
//   try {
//     const { name, password } = req.body;
//     const user = await User.findOne({ name });
//     if (user && bcrypt.compareSync(password, user.password)) {
//       res.status(200).json({ userId: user._id, accessToken: user.accessToken });
//       //compare passwords
//     } else {
//       res.status(404).json({notFound: true, message: "Incorrect username and/or password"});
//     }
//   } catch (err) {
//     res.status(404).json({notFound: true, message: "Incorrect username and/or password"});
//   }
// });


// // Secure endpoint, user needs to be logged in to access this.
// // app.get('/users/:id/profile', authenticateUser);
// // app.get('/user/:id/profile', async (req,res) => {
// //   const user = await User.findOne({_id:req.params.id});
// //   const publicProfileMessage = `Hello, ${user.name}, this public message is for you.`
// //   const privateProfileMessage = `Hello, ${user.name}, this private message is for you.`
// //   res.status(200).json({profileMessage});

// // console.log(`Authenticated req.user._id: ${req.user._id}`)
// // console.log(`Requested.user._id: ${user._id}`)

// // Endpoint that shows a page to the user when logged in
// // app.get('/welcome', authenticateUser)
// // app.get('/welcome', (req, res) => {
// //   const welcomeMessage = `This is a welcome message for ${req.user.name}`
// //   res.status(201).json({ welcomeMessage })
// // })


//   // if(req.user._id === user._id){
//   //   ///Private
//   //   res.status(200).json({profileMessage: privateProfileMessage})
//   // }else{
//   //   //Public
//   //   res.status(200).json({profileMessage: publicProfileMessage})
//   // }
//   //decide private of public
// //});

// // Logout
// app.post('/users/logout', authenticateUser);
// app.post('/users/logout', async (req, res) => {
//   try {
//     req.user.accessToken = null;
//     await req.user.save();
//     res.status(200).json({ loggedOut: true });
//   } catch (err) {
//     res.status(400).json({ error: 'Could not logout' });
//   }
// });


// //get user specific info, secret page in userprofile
// app.get('/users/:id/secret', authenticateUser);
// app.get('/users/:id/secret', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     if (userId != req.user._id) {
//       console.log(
//         "Authenticated user does not have access to this secret.  It's someone else's!"
//       );
//       throw 'Access denied';
//     }
//     const secretMessage = `This is a secret message for ${req.user.name}`;
//     res.status(200).json({ secretMessage });
//   } catch (err) {
//     res.status(403).json({ error: 'Access Denied' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

