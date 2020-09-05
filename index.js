const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const config = require('./config/key');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.mongoURI, {
  useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log("Mongoose Connected...")).catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((error, newUser) => {
    if(error){
      return res.json({ success: false, error: error});
    }
    return res.status(200).json({ success: true, data: newUser});
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne( { email: req.body.email }, function(err, user){
    if(!user){
      return res.json({
        logInSuccess: false,
        message: "아이디가 존재하지 않습니다."
      });
    }

    user.comparePassword(req.body.password, function(err, isMatch){
      if(!isMatch){
        return res.json({
          logInSuccess: false,
          message: "비밀번호가 존재하지 않습니다."
        });
      }
      user.generateToken(function(err, user){
        if(err){
          return res.status(400).send(err);
        }
        return res.cookie("x_auth", user.token).status(200).json({
          logInSuccess: true,
          message: `${user.token} 로그인 완료`
        });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  if(!req.user){
    return res.json({ isAuth: false, message: "사용자를 찾을 수 없습니다."});
  } else {
    return res.status(200).json({
      isAuth: true,
      user: req.user
    });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send('Some Error!!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});