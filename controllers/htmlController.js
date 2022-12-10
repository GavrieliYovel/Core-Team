const Logger = require("../logger/Logger");
const logger = new Logger();

exports.htmlController = {
    //render login page
    getLogin(req, res) {
        logger.log("getting index.ejs");
        res.render("index");
    },
    //render if there is a session to boards list
    getHome(req, res) {
        if(!req.session.userName) {
            res.status(300).redirect('/');
        } else {
            logger.log("getting boards.ejs");
            res.render("boards");
        }

    },
    //render if there is a session to task list
    getTasksList(req, res) {
        if(!req.session.userName) {
            res.status(300).redirect('/');
        } else {
            logger.log("getting tasks.ejs");
            res.render("tasks");
        }
    }
}
