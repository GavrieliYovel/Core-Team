// imports
const express = require("express");
const path    = require("path")
const cors    = require('cors');
const app     = express();

const port = process.env.PORT || 3000;

// static files
app.use(express.static("public")); 
app.use("/css", express.static(__dirname + "public/css")); 
app.use("/js", express.static(__dirname + "public/js"));
app.use("/includes", express.static(__dirname + "public/includes"));

// set views
app.set("views", "./pages");
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));  // hundel post reqs with body



const { boardsRouter } = require("./routers/boardsRouter");

app.use('/api/boards', boardsRouter);

const { htmlRouter } = require("./routers/htmlRouter")
app.use('/', htmlRouter);

app.use((req, res) => {
    res.status(400).send('Something is broken!');
});
app.listen(port, () => console.log(`Express server is running on port ${port}`));