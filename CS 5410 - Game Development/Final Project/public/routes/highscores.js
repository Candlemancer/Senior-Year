// Jonathan Petersen
// A01236750

var scores = [{
	name: 'Captain Istanbul',
	score: 25000
}, {
	name: 'The Hunk',
	score: 10000
}, {
	name: 'Potassium Man',
	score: 15000
}, {
	name: 'Thod of Asparry',
	score: 20000
}, {
	name: 'Daddy Long-Legs',
	score: 5000
}];

exports.onGet = function(req, res) {
	res.writeHead(200, {
		'content-type': 'application/json'
	});
	res.end(JSON.stringify(scores.sort(function(a, b) {
		return (a.score < b.score);
	})));
}

exports.onPost = function(req, res) {
	scores.push({
		name: req.query.name,
		score: Number(req.query.score)
	});

	scores = scores.sort(function(a, b) {
		return (a.score < b.score);
	});
	scores = scores.splice(0, 20);
}
