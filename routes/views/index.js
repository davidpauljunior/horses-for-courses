var keystone = require('keystone');
var Race = keystone.list('Race');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.races = [];
	
	// TODO: create an updated results and return that as the local.races array.

	function decimalOdds(fraction) {
		const splitFields = fraction.split('/');
		return ((splitFields[0] / splitFields[1]) + 1).toFixed(2);
	}

	view.on('init', function(next) {
		// TODO later: Pagination
		var q = Race.model.find();

		q.exec(function(err, results) { 
			var updatedResults = [];

			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				var odds = decimalOdds(result.odds);
				result.decimalOdds = odds;

				updatedResults.push(result);
				console.log(result.decimalOdds);
			}

			// THIS DOES NOT CONTAIN THE DECIMAL ODDS
			console.log(updatedResults);

			// do something with posts
			locals.races = results; // TODO: Will change to updatedResults
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
