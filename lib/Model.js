var db = require("../db/dbConnection")
var BuilderCypherNeo4j = require("./BuilderCypherNeo4j")

class Model {
    builderCypher = null;
    node = null;
    relations = [];
    attributes = {};
    constructor() {
        if (this.constructor === Model) {
            throw new Error("Can't instantiate abstract class!");
        }
        this.builderCypher = new BuilderCypherNeo4j();
        //this.session =  db.session;
    }

    /**
     * save a model to db
     */
   async store()
    {

        return this.builderCypher.create(this.node, this.getAttributeAsString()).run();
    }

    /**
     * make a relation between two nodes based their names
     */
    async makeRelationByName(node1, node2, name1, name2){

        let res =  await this.builderCypher.run(
            `
                MATCH (a:${node1})
                with a
                match(b:${node2})
                WHERE a.name = "${name1}"  AND b.name = "${name2}"
                CREATE (a)-[r:RELEASED]->(b)
                RETURN r
            
               `
        ).then(function (res) {
            return res;
        }).catch(function (err) {
            console.log("res", error);
        })

        this.builderCypher.closeSession();
        return;

    }

    /**
     * retrieving all nodes and their relations
     */
    async all()
    {

        let records = await this.builderCypher.match(this.node).select().run();
        return this.getProperties(records);
    }

    async allNodesWithRelation()
    {
        return  this.builderCypher.match().select().run();

    }


    /**
     * this function must be override by models
     */
    getAttributes(){
        return {}
    }


    /**
     * this function converts the attributes that are as object to string
     */
    getAttributeAsString(){

        let attributes = this.getAttributes();
        let stringAttributes = "{";
        for (let key in attributes) {
            stringAttributes += `${key}: "${ attributes[key] }",`
        }
        if (stringAttributes.length > 1){
            stringAttributes = stringAttributes.substring(0, stringAttributes.length - 1);
        }

        stringAttributes +=  " } ";
        return stringAttributes
    }


    /**
     * this method returns the properties of each node in records
     */
    getProperties(records)
    {

        let properties = [];
        for (let key in records){

            let node = (records[key]).get(0);

            let p = node.properties
            p.id = node.identity.low;

            properties.push(p)
        }

        return properties;
    }
}

module.exports = Model;
