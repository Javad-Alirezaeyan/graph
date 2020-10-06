'use strict'

var resetDb = require("../db/reset-db")
const Item = require("../models/Item")
var data =  require("../db/initialData");



module.exports.up = async (next)=> {

  let registeredItem = [];

  let items = data['data']

  //console.log("sss", items)
  await makeNodes(items);
  await makeRelations(items);
  next();
}

module.exports.down = async function (next) {
  await resetDb();
  next()
}



async function makeNodes(items) {

  let item = new Item();

  for (let key in items ){

    let item = items[key];

    let itemNode = new Item();
    itemNode.name = item['name'];
    itemNode.description = item['description'];
    itemNode.parentName = item['parent'];
    await itemNode.store();
  }
}


async function makeRelations(items) {
  let itemNode = new Item();
  for (let key in items ){

    let parentName = items[key]['parent'];
    let childName = items[key]['name'];

    if (parentName == "") continue;

     await itemNode.makeRelationByName(itemNode.node, itemNode.node, parentName, childName )
  }

  //itemNode.builderCypher.closeSession()
}