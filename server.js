const express = require("express"); // const http = require('http');
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;
// const logger = require("morgan"); //NOTE: for debugging
const { boardRouter } = require("./routers/boardsAndTasksRouter");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(logger("dev"));
app.set("view engine","ejs")
app.set("views", path.resolve(__dirname,"views"))
app.use('/assests',express.static(path.resolve(__dirname,"assests")))
app.listen( port,()=>console.log('Express server is running on port',port)); // http.createServer(router).listen(3030);
console.log('we created a server');

app.use('/api', boardRouter);