var keystone = require('keystone');
var Race = keystone.list('Race');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.races = [];

	view.on('init', function(next) {
		var q = Race.model.find()
			.where('state', 'published')
			.populate('author')
			.sort('-publishedAt')
			.limit(5);

		q.exec(function(err, results) {
			// do something with posts
			locals.races = results;
		});
	});

	// Render the view
	view.render('index');
};
