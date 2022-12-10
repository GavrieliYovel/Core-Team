const mongoose = require('mongoose');
require('dotenv').config();
const Logger = require('./logger/Logger');
const logger = new Logger();

const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true // For deprecation warnings
};
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.DB_HOST, options)
    .then(() => logger.log('successfully connected to mongoDB'))
    .catch(err => logger.log(`connection error: ${err}`));
