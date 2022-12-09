const Logger = require("../logger/Logger");
const logger = new Logger();

exports.htmlController = {

    getLogin(req, res) {
        logger.log("getting index.ejs");
        res.render("index");
    },

    getHome(req, res) {
        if(!req.session.userName) {
            res.status(300).redirect('/');
        } else {
            logger.log("getting boards.ejs");
            res.render("boards");
        }

    },

    getTasksList(req, res) {
        if(!req.session.userName) {
            res.status(300).redirect('/');
        } else {
            logger.log("getting tasks.ejs");
            res.render("tasks");
        }
    }
}
