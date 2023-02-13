const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const users = require('./routes/api/users');
const logger = require('morgan');
const app = express()
const port = 5000;
const path = require('path');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());// DB Config
app.use(cors());
app.use(logger('dev'));

app.use(function(req,res,next){
  console.log(req.body);
  next();
})

const db = require("./config/key").mongoUsersURI;
mongoose.set('strictQuery',false);
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,  useUnifiedTopology: true, dbName: 'vishakha' },
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use('/api',users);
const level1 = require('./routes/levels/levels1');
app.use('/level1',level1);
// const level2 = require('./routes/levels/levels2');
// app.use('/level2',level2);
// const level3 = require('./routes/levels/levels3');
// app.use('/level3',level3);
// const level4 = require('./routes/levels/levels4');
// app.use('/level4',level4);
// const level5 = require('./routes/levels/levels5');
// app.use('/level5',level5);
// const level6 = require('./routes/levels/levels6');
// app.use('/level6',level6);
const update = require('./routes/updatescore/update');
app.use('/update',update);
const checkmail = require('./routes/forgotPassword/forgotApi');
app.use('/forgot',checkmail);
const changePass = require('./routes/forgotPassword/resetAPI');
app.use('/reset',changePass);
const tokenVerify = require("./routes/forgotPassword/tokenVerify");
app.use('/verify',tokenVerify);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
