
var keystone = require('keystone');
var Types = keystone.Field.Types;

var Race = new keystone.List('Race');

Race.add({
    date: { type: Types.Date, required: true, initial: true },
    course: {type: String, required: true, initial: true },
    race: { type: Types.Date, format: 'hh:mm', required: true, initial: true },
    odds: { type: String, required: true, initial: true},
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
