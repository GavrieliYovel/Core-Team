const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());    
app.use(express.urlencoded({extended: true}));  // מטפל בבקשות post עם body


const { boardsRouter } = require("./routers/boardsRouter");
app.use('/api/boards', boardsRouter);

app.use((req, res) => {
    res.status(400).send('Something is broken!');
});
app.listen(port, () => console.log(`Express server is running on port ${port}`));