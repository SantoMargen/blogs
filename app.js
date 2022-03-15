if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const port = process.env.PORT || 3000;
const uri = process.env.URI_MONGODB;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log('connection Error', err);
    } else {
      console.log('Mongoose is connected!!!!');
    }
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
