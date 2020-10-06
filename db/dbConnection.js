const neo4j = require('neo4j-driver');
require('dotenv').config()


class dbConnection {

    driver = null;
    userName = process.env.NEO4J_USERNAME
    password = process.env.NEO4J_PASSWORD
    protocol = process.env.NEO4J_PROTOCOL
    host = process.env.NEO4J_HOST
    port = process.env.NEO4J_PORT

    constructor(){
        this.makeConnection();
    }

    makeConnection(){

      //  let driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "qaz"));
        let driver = neo4j.driver(`${this.protocol}://${this.host}:${this.port}`, neo4j.auth.basic(this.userName, this.password));

        this.driver = driver;
    }
}

const db = new dbConnection();
//Object.freeze(db);


module.exports = db;
