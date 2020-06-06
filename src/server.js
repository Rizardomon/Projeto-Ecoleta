const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public"))

// Utilizando Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da aplicação
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

    // Pegar dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // console.log("Aqui estão seus registros: ")
        // console.log(rows)

        return res.render("search-results.html", { places: rows, total: total })
    })
})

// Ligar o servidor
server.listen(3000)