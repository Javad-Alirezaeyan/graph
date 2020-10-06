var db = require("../db/dbConnection");

var driver = db.driver;
var session = driver.session();


var resetDb = async function(){
   await session.run("MATCH (n) DETACH DELETE n").then(function (res) {
        console.log("database has been reset")
    }).catch(function (err) {
        console.log(err);
    });
   session.close();
   driver.close();

}


module.exports = resetDb;
