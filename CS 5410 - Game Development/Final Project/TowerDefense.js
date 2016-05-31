var express = require('express'),
	highscores = require('./public/routes/highscores'),
	http = require('http'),
	path = require('path'),
	app = express();

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(__dirname + '/images'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.get('/', function(request, response) {
	console.log('received request');
	response.sendFile('index.html');
});

app.get('/v1/highscores', highscores.onGet);
app.post('/v1/highscores', highscores.onPost);

app.listen(3000, function() {
	console.log('Server is listening');
});
