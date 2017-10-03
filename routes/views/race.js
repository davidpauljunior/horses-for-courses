var keystone = require('keystone');
var Race = keystone.list('Race');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'race';
	// locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.raceSubmitted = false;

	view.on('post', { action: 'contact' }, function (next) {

		var application = new Race.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.raceSubmitted = true;
			}
			next();
		});

	});

	view.render('contact', {
		section: 'contact',
	});

}
