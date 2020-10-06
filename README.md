
<h2>Graph task</h2>

This a simple project using node.js showing a tree

<h3>Introduction</h3>
You can see the online version here:
<a href="" target="_blank">click here</a>

<h4> Points</h4>
The structure of the application is based on MVC. First, the client sends a request, it checks in routes files(one for 
web and another for api ) and after that send
to controllers. Controllers make connections with the database by models. We have an abstract model that each model must be extended from that. Models make and run
the query on the database with a Querybuilder(this class has been designed with Builder design pattern) that creates Cypher commands interacting with the database.
This project uses Neo4j as a database.  There are some classes and functions to make connections.
We have used the singleton design pattern preventing a new connection for each request to the database. Also, there is a migration
folder that you can see the details of how to insert initial data into the database. To migrate initial data to the database after install the project run
        npm run migrate-up

also, to empty the database, you can use this command:
        npm run migrate-down

Homepage (/) creates a graph of nodes and their relations. After receiving the data by Api, the graph is implemented by Vanilajs codes.
<hr />
<h4> Technical</h4>
Used techniques are presented in the following:

Languages:
<ul>
<li>Javascript</li>
<li>CSS3</li>
<li>HTML5</li>
</ul>

Database:
<ul>
<li>Neo4j</li>
</ul>

Framework and Library:
<ul>
<li>Expres</li>
</ul>

tools:
<ul>
<li>Docker</li>
<li>NPM</li>
<li>Git</li>
</ul>

Other:
<ul>
<li>Jest</li>
<li>Object orinted</li>
<li>SOLID</li>
<li>Design patterns(Builder, Singleton) </li>
</ul>
<hr />



<h3>install</h3>

<h4>install without docker</h4>
To install without docker, you must have been installed the following:
<ul>
<li>node 14</li>
<li>neo4j (install and run it)</li>
</ul>

1. Clone the source code from github repository. To do that open terminal and type the following command:


     git clone https://github.com/Javad-Alirezaeyan/graph.git


2. Then, open the  orderProduct directory with command:

        cd graph

3. configure the .env file(specially the configuration of database)
4. run the following command to install packages:

       npm install

4. Then, run the following command to insert default data to database :

       npm run migrate-up

 (if you want to reset the db, run <code>  npm run migrate-down</code>)
5. Then, run the project:
        
        npm run start


As a final step,  visit http://your_server_ip:3000 in the browser.

<h4>install with docker</h4>
   
##screenshots


![alt text](https://github.com/Javad-Alirezaeyan/graph/blob/master/screenshots/1.png)

