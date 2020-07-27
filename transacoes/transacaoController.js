const express = require("express");
const Transacao = require("./transacao");
const router = express.Router();
const auth = require("../middlewares/auth")

router.get("/new", auth, (req, res) => {
    res.render("new")
})

router.post("/registrar", (req, res) => {
    var year = req.body.year
    var monthForm = req.body.month
    var data = req.body.day
    var typeForm = req.body.type
    var description = req.body.description
    var value = req.body.value
    var month;
    var type;

    switch (monthForm) {
        case '1':
            month = "January"
            break;
        case '2':
            month = "February"
            break;

        case '3':
            month = "March"
            break;

        case '4':
            month = "April"
            break;

        case '5':
            month = "May"
            break;

        case '6':
            month = "June"
            break;

        case '7':
            month = "July"
            break;

        case '8':
            month = "August"
            break;

        case '9':
            month = "September"
            break;
        case '10':
            month = "October"
            break;
        case '11':
            month = "November"
            break;

        case '12':
            month = "Dezember"
            break;

    }

    switch (typeForm) {
        case '1':
            type = "Food"
            break;
        case '2':
            type = "Education"
            break;
        case '3':
            type = "Recreation"
            break;
        case '4':
            type = "Health"
            break;
        case '5':
            type = "Transport"
            break;
    }

    Transacao.create({
        year: year,
        month: month,
        data: data,
        type: type,
        description: description,
        value: value,
        UserId: req.session.user.id

    }).then(() => {
        res.redirect("/historic")
    }).catch((erro) => {
        console.log(erro)
    })
})

router.get("/historic", auth, (req, res) => {
    Transacao.findAll({
        order: [
            ["id", "DESC"]
        ],
    }).then((transacoes) => {
        res.render("historic", {
            transacoes: transacoes
        })
    })

})
module.exports = router;