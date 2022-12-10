const {User} = require('../models/user');
const Logger = require('../logger/Logger');
const logger = new Logger();

exports.sessionDbController = {
    //Validate user and making a session
    async login(req, res) {
        const email = req.body.userEmail.toLowerCase();
        const password = req.body.userPassword;
        await User.find({$and: [ { userEmail: email }, { userPassword: password }]}).exec()
            .then(user => {
                if (user.length == 1) {
                    req.session.userName = user[0].userName;
                    req.session.userRole = user[0].userRole;
                    logger.log(`${email} logged in successfully`);
                    res.send("Success");
                } else {
                    logger.log(`${email} failed to login`);
                    res.send("Error");
                }
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //destroy the session
    logout(req, res) {
        req.session.destroy();
        res.send("Success");
    },
    //Get user details from session
    getUser(req, res) {
        res.json({
            "name": req.session.userName,
            "role": req.session.userRole
        });
    }
}
