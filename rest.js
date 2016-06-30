
	var express = require('express');
	var bodyParser  =  require("body-parser");
	var fs = require("fs");
	var app = express();

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	/*	
		creating the common route 
		var router = express.Router();    
		app.use('/api', router);
	*/

	app.get('/users/:id?', function (req, res) {
		fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
			val = JSON.parse(data);
			//console.log(data);
			if(req.params.id) {
				console.log("id :"+req.params.id);
			  	console.log( val[req.params.id]);
			  	res.send(val[req.params.id]);
			} else  {
		   		console.log( val);
		   		res.send(val);
		   }
		});
	})

	app.listen(81);

  
