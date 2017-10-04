var keystone = require('keystone');
var Types = keystone.Field.Types;

var Race = new keystone.List('Race');

// format: 'D MMM YYYY hh:mm' this isn't working in datetime

Race.add({
    date: { type: Types.Datetime, required: true, initial: true },
    course: {type: Types.Text, required: true, initial: true },
    odds: { type: Types.Text, required: true, initial: true},
	position: { type: Types.Select, options: [
        { value: 'won', label: 'Won' },
        { value: 'placed', label: 'Placed' },
        { value: 'did not place', label: 'Did not place' }
    ], required: true, initial: true }
});

Race.track = true;
Race.defaultSort = '-createdAt';
Race.defaultColumns = 'date, course, race, odds, position, createdAt';
Race.register();
