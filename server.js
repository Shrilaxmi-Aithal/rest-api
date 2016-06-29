

var express = require('express');
var app = express();

app.get('/users',function(req ,res) {
	res.send("hello get");
});
app.post('/',function(req ,res) {
	res.send("hello post");
});



var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port)

})