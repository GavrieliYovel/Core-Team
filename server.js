const express = require("express"); // const http = require('http');
const app = express();
const port = process.env.PORT || 8080;
// const logger = require("morgan"); //NOTE: for debugging
const { boardRouter } = require("./routers/router");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(logger("dev"));


app.listen( port,()=>console.log('Express server is running on port',port)); // http.createServer(router).listen(3030);
console.log('we created a server');

app.use('/api', boardRouter);
// app.get("/",(req, res) => {
//     res.end("Done");
// })
//
// app.use((req, res) => {
//     res.status(400).send('Something is broken!');
// });