const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://HKC:abcd1234@mernstackpractice.1stmk.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log("Mongoose Connected...")).catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((error, newUser) => {
        if(error){
            return res.json({ success: false, error: error});
        }
        return res.status(200).json({ success: true, data: newUser});
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});