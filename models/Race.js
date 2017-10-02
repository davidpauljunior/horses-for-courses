
var keystone = require('keystone');
var Types = keystone.Field.Types;

var Race = new keystone.List('Race', {
	nocreate: true,
});

Race.add({
    date: { type: Types.Date, required: true },
    course: {type: String, required: true },
    race: {type: Types.Date, format: 'hh:mm', required: true },
    odds: { type: String, required: true},
	position: { type: Types.Select, options: [
        { value: 'won', label: 'Won' },
        { value: 'placed', label: 'Placed' },
        { value: 'did not place', label: 'Did not place' }
    ], required: true }
});

Race.track = true;
Race.defaultSort = '-createdAt';
Race.defaultColumns = 'date, course, race, odds, position, createdAt';
Race.register();