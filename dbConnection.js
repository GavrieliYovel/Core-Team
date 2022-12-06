const mongoose = require('mongoose');
const url = `mongodb+srv://Viki:Viki1996@cluster0.vrxr9qa.mongodb.net/Boards?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true // For deprecation warnings
};

mongoose
    .connect(url, options)
    .then(() => console.log('connected'))
    .catch(err => console.log(`connection error: ${err}`));