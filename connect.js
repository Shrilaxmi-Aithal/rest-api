
	var mysql  = require('mysql');
	var express = require('express');
	var bodyParser  =  require("body-parser");
	var app = express();

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	/*	
		creating the common route 
		var router = express.Router();    
		app.use('/api', router);
	*/

	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'minproject'
	});

	connection.connect(function(err) {
		if(err)
			console.log("Error in connecting");
		else 
			console.log("Conncted successfully");
	});
	

	// request to get all the users or specified user 
	app.get('/users/:id?',function(req ,res) {
	
		// If request for specific user 
		if(req.params.id) {

			console.log("requested id: "+req.params.id);
			var sql = 'SELECT * from `user` where `id` = '+req.params.id;
		} else {
			console.log("requesting for all users");
			var sql = 'SELECT * from `user`';
		}
		connection.query(sql, function(err, rows, fields) {

			// If no error in query execution 
		  	if (!err) {

		  		// call the function to get the resultset array 
		  		var resultset  = getdata(rows);
				if(resultset.length == 0) {

					//res.writeHead(400, {'Content-Type': 'text/json'});
					var msg = {"message" : "user doesn't exist"};
					console.log("user doesn't exist");
					res.json(msg);
				} else {
					res.json(resultset);
				}
			} else
		    	console.log('Error while performing Query.');
		});
		//connection.end();
	});

	app.post('/users',function(req ,res) {
		console.log("Name: "+req.body.name);
		console.log("email: "+req.body.email);

		if(req.body.name && req.body.email) {
		
			var sql = "insert into `user`(`name`, `email`,`age`,`dob`)  values('"+req.body.name+"','"+req.body.email+"','"+req.body.age+"','"+req.body.dob+"')";
			connection.query(sql, function(err, rows, fields) {
			  	if (!err) {
			  		
					//res.writeHead(400, {'Content-Type': 'text/json'});
					var obj = {"message" : "added successfully"};
					console.log("added successfully");
					res.json(obj);
				} else {
					var obj = {"message" : "user already exist"};
					console.log("user already exist");
					res.json(obj);
				}
			});
		} else {
				var obj = {"message" : "user and email is mandatory"};
				console.log("user  and email is mandatory");
				res.json(obj);
		}
		//connection.end();
	});

	app.put('/users/:id',function(req ,res) {
		console.log("Id: "+req.params.id);
		console.log("name: "+req.body.name);
		console.log("email: "+req.body.email);
				
		var sql = "update `user` set `name`='"+req.body.name+"',`email` ='"+req.body.email+"',`age` = '"+req.body.age+"',`dob` = '"+req.body.dob+"' where `id` = '"+req.params.id+"'";
		console.log(sql);
		connection.query(sql, function(err, rows, fields) {
		  	if (!err) {
		  		var rowsaffected = rows.affectedRows; 
		  		if(rowsaffected != 0) {
				
					var obj = {"message" : "updated successfully"};
					console.log("updated successfully");
					res.json(obj);
				} else {

					var obj = {"message" : "user doesn't exist"};
					console.log("user already exist");
					//res.writeHead(400, {'Content-Type': 'text/event-stream'});
					res.json(obj);
				}
			} else {
				var obj = {"message" : "Username should be unique"};
		    	console.log('Error while performing Query:Name should be unique');
		    	res.json(obj);
		    }
		});
		//connection.end();
	});

	app.delete('/users/:id',function(req ,res) {

		console.log("requested id to delete "+req.params.id);
		var sql = 'delete from `user` where `id` = '+req.params.id;
		console.log(sql);
		connection.query(sql, function(err, rows, fields) {
		  	if (!err) {
		  		var rowsaffected = rows.affectedRows; 
		  		if(rowsaffected != 0) {

					//res.writeHead(400, {'Content-Type': 'text/json'});
					var obj = {"message" : "deleted successfully"};
					console.log("deleted successfully");
					res.json(obj);
				}
				else {
					var obj = {"message" : "user doesn't exist"};
					console.log("user doesn't exist");
					res.json(obj);
				}
			} else {
				var obj = {"message" : "Error while performing Query"};
		    	console.log('Error while performing Query');
		    	res.json(obj);
		    }
		});
		
	});

	// function to get resultset array
	function getdata(rows) {
		var result = [];
	  	for(var i =0; i< rows.length; i++) {
	  		var obj = {
					"id" : rows[i]['id'],
					"name" :rows[i]['name'],
					"age" :rows[i]['age'],
					"dob" : rows[i]['dob']				
			}
	  		result.push(obj);
	   	}	
	   	return result;
	}

	app.listen(process.env.PORT || 8081)

  
