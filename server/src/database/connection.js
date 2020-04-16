const mongoose = require('mongoose');

const databaseConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connect) console.log('Connection established successfully');
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnection;
