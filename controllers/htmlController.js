const Logger = require("../logger/Logger");
const logger = new Logger();

exports.htmlController = {

    getLogin(req, res) {
        logger.log("getting index.ejs");
        res.render("index");
    },

    getHome(req, res) {
        logger.log("getting boards.ejs");
        res.render("boards");
    },

    getTasksList(req, res) {
        logger.log("getting tasks.ejs");
        res.render("tasks");
    }
}