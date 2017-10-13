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
			var profit = 0;
			var stake = 1; // Todo: configurable from input box

			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				// result.won comes from virtual in schema
				if (result.won) {
					var returns = (stake * result.odds) - stake;
					profit = (profit + returns);
					result.returns = `£${returns}`;
				} else {
					profit = (profit - stake);
					result.returns = `-£${stake}`;
				}
			}

			results.profit = profit;
			results.stake = stake;
			// do something with posts
			locals.races = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
