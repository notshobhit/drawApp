var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static('public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log('a man has connected');
	
	socket.on('hello', function(data){
		console.log('a man says hi: ' + data);
	});

	socket.on('request_paint', function(data){
		io.emit('paint_on_client', data);
	});
});