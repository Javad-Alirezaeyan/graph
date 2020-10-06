var Model = require("../lib/Model");
const sourcefile = require("../db/dbConnection")

/**
 * this class is responsible connecting to db for nodes that are called Item
 */
class Item extends Model{
    name = "";
    description = "";
    parentName ="";
    parentId = "";

    constructor(){
        super();
        this.node = "Item";
    }

    /**
     * overriding of Model class
     */
    getAttributes(){
        return {
            'description' : this.description,
            'parentName' : this.parentName,
            'parentId' : this.parentId,
            'name' : this.name
        }
    }

}

module.exports = Item;