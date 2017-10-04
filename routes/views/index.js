var keystone = require('keystone');
var race = keystone.list('Race');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.races = [];

	// Load the races
	view.on('init', function (next) {
		var q = Race.paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
		})
		.where('state', 'published')
		.sort('-publishedDate');

		q.exec(function (err, results) {
			locals.races = results;
			next(err);
		});
		// var q = Post.paginate({
		// 		page: req.query.page || 1,
		// 			perPage: 10,
		// 			maxPages: 10,
		// 	})
		// 	.where('state', 'published')
		// 	.sort('-publishedDate')
		// 	.populate('author categories');

		// if (locals.category) {
		// 	q.where('categories').in([locals.category]);
		// }

		// q.exec(function (err, results) {
		// 	locals.posts = results;
		// 	next(err);
		// });
	});

	// Render the view
	view.render('index');
};
