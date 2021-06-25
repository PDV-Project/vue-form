const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const connection = require("./database/connection")
const Register = require("./models/Register")

const cors = require("cors")
const { default: axios } = require("axios")

connection.authenticate().then(() => {
    console.log("Conectado ao banco de dados com sucesso")
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/register', (req, res) => {

    const { nome, email, password } = req.body

    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    if (nome != "" && email != "" && password != "") {

        Register.create({
            name: nome,
            email: email,
            password: hash
        }).then(() => {

            res.json({ message: "Usuário cadastrado com sucesso" })
        })
    }

    const response_key = req.body["g-recaptcha-response"];
    // Put secret key here, which we get from google console
    const secret_key = "<6LfSplQbAAAAAAJnDexGNEStnzmTrgbrWrPZoQNF>";

    // Hitting POST request to the URL, Google will
    // respond with success or error scenario.
    const url =
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;

   
});


app.listen('3000', () => console.log("Server running at port 3000"))