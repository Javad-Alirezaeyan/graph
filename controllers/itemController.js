const Item = require("../models/Item")
const makingTree = require("../helpers/tree")

/**
 * this function returns all nodes as JSON
 */



exports.get =  (req, res) =>
{
    let item = new Item();
    item.all()
        .then(records=>{

            let root;

        res.json(
            {
                status: "ok",
                data : makingTree(records)
            }
        );
    })
        .catch(err => {
        res.status(500).json({

            message: err.message
        });
    });

};

/*
var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};*/

