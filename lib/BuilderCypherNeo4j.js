var db = require("../db/dbConnection")

const BUILDER_TYPE_CREATE = "create";
const BUILDER_TYPE_SELECT = "select";
const BUILDER_TYPE_DELETE = "delete";

/**
 * this class runs all query on the Neo4j database and is responsible for making query based Cypher language
 */
class BuilderCypherNeo4j{

    session = null;
    driver = null;
    cypherQuery ="";
    prefixNode = "n";
    selectString ="";
    matchString ="";
    relation = "";
    conditions = "";
    prefixRelation = "";
    type = "";

    constructor(){

       this.driver = db.driver;
    }


    /**
     * making a query for creating nodes
     */
    create(nodeName,   attributes =[])
    {
        this.type = BUILDER_TYPE_CREATE;

        this.cypherQuery = `CREATE (a:${ nodeName } ${ attributes } ) RETURN a`;
        return this;
    }

    /**
     * this function determines which fields must be returned
     */
    select(returnedFields = null)
    {
        let stringReturnedFields = "";

        if (returnedFields != null){

            for (let key in returnedFields){
                stringReturnedFields += `${this.prefixNode}.${returnedFields[key]},`
            }

            if (stringReturnedFields.length > 0){
                stringReturnedFields = stringReturnedFields.substring(0, stringReturnedFields.length - 1);
            }
        }
        else{
            stringReturnedFields = this.prefixNode;
        }

        this.selectString = stringReturnedFields;

        return this;
    }

    /**
     * making match command
     */
    match( item=null )
    {

        this.type = BUILDER_TYPE_SELECT;

        if (item === null){
            this.matchString = `MATCH ${this.prefixNode}`;
        }
        else {
            this.matchString = `MATCH (${this.prefixNode}:${item})`;
        }

        return this;
    }

    /**
     * if there is a relation, you can call this function when you are creating a Cypher-query
     */
    withRelation()
    {

        this.relation = ` MATCH (${ this.prefixNode })-[${ this.prefixRelation }]-() `;
    }

    /**
     * this function can add conditions to Cypher-query
     */
    where( conditions = null )
    {

        let stringConditions= "";

        if (conditions != null){
            for (let key in conditions){
                stringConditions += `${this.prefixNode}.${key} = ${conditions[key]},`
            }
            stringConditions= this.prefixNode;
        }

        if (stringConditions.length > 0){
            stringConditions = stringConditions.substring(0, stringConditions.length - 1);
        }

        this.conditions = stringConditions;
        return this;
    }

    async run(cypherQuery = null)
    {
        if (cypherQuery == null){
            cypherQuery = this.getCypherQuery();
        }

        let session = await this.makeSession();
         return await session.run( cypherQuery).then(function (result) {
            return result.records;
        });
    }


    /**
     * returning make a query based the request
     */
    getCypherQuery()
    {
        switch (this.type) {
            case BUILDER_TYPE_CREATE:
                break;
            case BUILDER_TYPE_SELECT:
                //creating a query
                let query = this.matchString;
                if (this.conditions != ""){
                    query += `where ${this.conditions} `
                }
                query += `Return ${this.selectString}`

                this.cypherQuery = query;

                break;

            default:
                throw new Error("Can't make a query!");
        }

        return this.cypherQuery;
    }

    /**
     * this function open a session to run query on db
      */
   async makeSession(){
       await this.closeSession();
        this.session = this.driver.session();
        return this.session;
    }

    closeSession(){
        if (this.session){
            this.session.close();
        }
    }
}

module.exports = BuilderCypherNeo4j;