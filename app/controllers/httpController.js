var httpController = function (http){
	console.log('httpController loaded');
	http.get('/', function (req, res){
		res.render('index');
	});
}
module.exports = httpController;