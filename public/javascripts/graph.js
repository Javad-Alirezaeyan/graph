var   graphData = [];
const GRAPH_BOARD_WIDTH = 1200;
const NODE_WIDTH = 200;
const NODE_HEIGHT = 120;
const DISTANCE_ROWS = 100

var nodes =[];


loadData();

function loadData() {

    //calling API
    clientWebApi('get', 'api/node', {} )
        .then(function (res) {
        if (res.status == "ok"){
           graphData = res.data

           makeGragh();
           makeListeners();

        }
    }).catch(function (err) {
         console.error(err)
    });
}


//--------------------------------------------------making Graph--------------------------------------------------------
/**
 * this function makes the graph
 */
function makeGragh()
{
    let graphElement =  document.getElementById("graphBoard");
    graphElement.innerHTML = makeNodes(graphData)

    setNodesPosition();
    if (graphData.length > 0){
        makeLines(graphData[0]);
    }

}

function makeNodes(nodes) {
   if (nodes.length == 0){
       return null;
   }
   let nodesHtml = "";
    for (let key in nodes) {
        if (nodes[key]['children'] === undefined){
            continue
        }
        nodesHtml =  makeNodes(nodes[key]['children']).concat( nodesHtml );
    }
    let rowHtml = makeRow(nodes);
    return  rowHtml.concat( nodesHtml );
}

function makeRow(nodes)
{

    let rowElement = document.createElement("div");
    rowElement.classList.add("nodesRow");
    let nodeMarginLeft = calculateNodeMarginRight(nodes.length);

    for (let key in nodes) {
        let nodeElement = makeNodeElement(nodes[key], nodeMarginLeft);
        rowElement.appendChild(nodeElement);

    }

    return rowElement.outerHTML;
}


function makeNodeElement(node, marginLeft)
{

    let nodeElement = document.createElement("div");

    nodeElement.classList.add("node-shadow");
    nodeElement.classList.add("node");
    nodeElement.style.marginLeft = ` ${marginLeft}px`;
    nodeElement.setAttribute('nodeId', node.id);
    nodeElement.setAttribute('parentName', node.parentName);

    let nodeBody = document.createElement("div");
    nodeBody.classList.add("node-body");
    nodeBody.innerHTML = `<h5> ${node.name} </h5>`;

    nodeElement.appendChild(nodeBody);

    nodes.push(node);

    return nodeElement;
}


function calculateNodeMarginRight(nodeCount) {

    return Math.trunc((GRAPH_BOARD_WIDTH-(nodeCount * NODE_WIDTH)) / (nodeCount + 1))

}

//----------------------------------------------------------------------------------------------------------------------

function hideAlertBoxDetail() {

    document.getElementById("alertTag").classList.add("hidden");
}

function showAlertBoxDetail() {

    document.getElementById("alertTag").classList.remove("hidden");
}

function setAlertBoxDetail(nodeId) {

    let key = findKeyNodeInList(nodeId)
    let node = nodes[key];

    document.getElementById("nodeDescriptionTitle").innerText = node.name;
    document.getElementById("nodeDescriptionContent").innerText = node.description;

    showAlertBoxDetail();
}

//----------------------------------------------------------------------------------------------------------------------

var nodeElements = document.getElementsByClassName("node");

var toggleNode = function() {

    if ( this.classList.contains("node-shadow") ){

        this.classList.remove("node-shadow")
        this.classList.add("selected")

        //show alert for the description of node
        setAlertBoxDetail(this.getAttribute("nodeId"), this.getAttribute("parentName"));

        unselectAllNodes(this);
    }
    else{
        this.classList.add("node-shadow")
        this.classList.remove("selected")
        hideAlertBoxDetail();
    }
};

function  unselectAllNodes(except){

    for (let i = 0; i < nodeElements.length; i++) {
        if ( nodeElements[i] != except ){
            nodeElements[i].classList.add("node-shadow")
            nodeElements[i].classList.remove("selected")
        }
    }
}

function  makeListeners()
{
    for (let i = 0; i < nodeElements.length; i++) {
        nodeElements[i].addEventListener('click',  toggleNode, false);
    }

}


function setNodesPosition() {
    var nodeElements = document.getElementsByClassName("node");
    for (let i = 0; i < nodeElements.length; i++) {
        let nodeId = (nodeElements[i]).getAttribute("nodeId");
        let nodeKey = findKeyNodeInList(nodeId);
        let Offset = getOffset(nodeElements[i]);

        nodes[nodeKey]['position'] ={
            top:{
                left:  Math.trunc(Offset.left + NODE_WIDTH / 2),
                top: Offset.top,
            },
            bottom:{
                left :Math.trunc(Offset.left + NODE_WIDTH / 2) ,
                top  : Math.trunc(   Offset.top + NODE_HEIGHT )
            }
        }
    }
}


function findKeyNodeInList(nodeId) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i]['id'] == nodeId){
            return i;
        }
    }
}



function makeLines(node) {

    if (node['children'] === undefined ){
        return ;
    }

    let children = node['children'];
    for (let key in children) {
        drawLineChildParent(children[key]['id'], node['id']);
        makeLines(children[key]);
    }
}


function  drawLineChildParent(childId, parentId){

    let parentKey = findKeyNodeInList(parentId);
    let childKey = findKeyNodeInList(childId);

    let parentPosition = nodes[parentKey]['position'];
    let childPosition = nodes[childKey]['position'];

    let halfDistanceRows = Math.trunc(DISTANCE_ROWS/2);

    linedraw(parentPosition.bottom.left,parentPosition.bottom.top, parentPosition.bottom.left, parentPosition.bottom.top + halfDistanceRows )
    linedraw(childPosition.top.left,childPosition.top.top, childPosition.top.left, childPosition.top.top - halfDistanceRows )
    linedraw(childPosition.top.left ,childPosition.top.top - halfDistanceRows, parentPosition.bottom.left, parentPosition.bottom.top + halfDistanceRows )
}


function linedraw(x1, y1, x2, y2) {

    if (x2 < x1) {
        tmp = x2 ;
        x2 = x1 ;
        x1 = tmp
        tmp = y2 ;
        y2 = y1 ;
        y1 = tmp
    }

    let lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    m = (y2 - y1) / (x2 - x1)

    let degree = Math.atan(m) * 180 / Math.PI

    document.body.innerHTML += "<div class='line' style='transform-origin: top left; transform: rotate(" + degree + "deg); " +
        " width: " + lineLength + "px; height: 2px; background: black; position: absolute; top: " + y1 + "px; left: " + x1 + "px;'></div>"
}

