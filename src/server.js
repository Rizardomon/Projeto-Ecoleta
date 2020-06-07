const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public"))

// Habilitar req.body da aplicação
server.use(express.urlencoded({ extended: true }))

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
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // Inserir dados no DB
    const query = `
         INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
         ) VALUES (?,?,?,?,?,?,?);
     `
    const values = [
        req.body.image,
        req.body.name,
        req.body.addres,
        req.body.addres2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log('Cadastrado com sucesso')
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

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