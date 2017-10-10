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
		// TODO later: Pagination
		var q = Race.model.find();

		q.exec(function(err, results) {
			// do something with races
			console.log(results);
			locals.races = results; // TODO: Will change to updatedResults
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
