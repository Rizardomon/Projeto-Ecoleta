// Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// Iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados, para operações
db.serialize(() => {
    //Criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
        // Inserir dados na tabela
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
    const values = []

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log('Cadastrado com sucesso')
        console.log(this)
    }

    db.run(query, values, afterInsertData)

    // Consultar dados da tabela

    // Deletar dados da tabela
})