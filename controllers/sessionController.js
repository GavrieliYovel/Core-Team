const {User} = require('../models/user');
exports.sessionDbController = {
    async login(req, res) {
        console.log(req.body);
        const email = req.body.userEmail.toLowerCase();
        const password = req.body.userPassword;
        await User.find({$and: [ { userEmail: email }, { userPassword: password }]}).exec()
            .then(user => {
                if (user.length == 1) {
                    req.session.userName = user[0].userName;
                    req.session.userRole = user[0].userRole;
                    console.log("Success");
                    res.send("Success");
                } else {
                    console.log("Error");
                    res.send("Error");
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    logout(req, res) {
        req.session.destroy();
        res.send("Success");
    },
    getUser(req, res) {
        res.json({
            "name": req.session.userName,
            "role": req.session.userRole
        });
    }
}
