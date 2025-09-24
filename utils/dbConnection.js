const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "student_management"
})

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connction has been established");

    const creationQuery = `create table if not exists students(
        id int auto_increment primary key,
        name varchar(255) not null,
        email varchar(255) unique not null,
        age int not null);`;

    connection.execute(creationQuery,(err)=>{
        if (err) {
            console.log(err);
            connection.end();
            return;
        }
        console.log("Table is created");
        
    });
})

module.exports = connection;
