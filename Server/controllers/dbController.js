const dbController = {};

dbController.connect = (req, res, next) => {
  require('dotenv').config();
  const mode = process.env.MODE;
  console.log('MODE', process.env.MODE);
  console.log('PROD DATABASE URI', process.env.DB_PROD_CONNECTION);
  console.log('DEV DATABASE URI', process.env.DB_DEV_CONNECTION);

  const mongoose = require('mongoose');

  if (mode === 'prod') {
    console.log(process.env.DB_PROD_CONNECTION);
    const MG_URI = process.env.DB_PROD_CONNECTION;
    mongoose
      .connect(MG_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'newtritrakr-prod',
      })
      .then(() => {
        console.log('Production database connected');
        return next();
      })
      .catch(() => console.log('Error occured while connecting to database'));
  } else if (mode === 'dev') {
    console.log(process.env.DB_DEV_CONNECTION);
    const MG_URI = process.env.DB_DEV_CONNECTION;
    mongoose
      .connect(MG_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'newtritrakr-dev',
      })
      .then(() => {
        console.log('Development database connected');
        return next();
      })
      .catch(() => console.log('Error occured while connecting to database'));
  }
};

module.exports = dbController;
