const mongoose = require('mongoose');
require('dotenv').config();


const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true // For deprecation warnings
};
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.DB_HOST, options)
    .then(() => console.log('connected'))
    .catch(err => console.log(`connection error: ${err}`));
