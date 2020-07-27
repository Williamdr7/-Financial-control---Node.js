const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("./user")

router.get("/register", (req, res) => {
    res.render("cadastro")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/user/save", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password

    User.findOne({ where: { email: email } }).then((user) => {
        if (user != undefined) {
            res.redirect("/login")
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/login")
            }).catch((erro) => {
                console.log(erro)
                res.redirect("/register")
            })

        }
    })
})

router.post("/authenticate", (req, res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({ where: { email: email } }).then((user) => {
        if (user == undefined) {
            res.redirect("/login")
        } else {
            var correct = bcrypt.compareSync(password, user.password)

            if (correct) {
                req.session.user = { id: user.id, email: user.email }
                res.redirect("/historic")

            } else {
                res.redirect("/login")
            }
        }

    })
})

module.exports = router