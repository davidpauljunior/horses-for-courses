var keystone = require('keystone');
var Types = keystone.Field.Types;

var Race = new keystone.List('Race');

// format: 'D MMM YYYY hh:mm' this isn't working in datetime

Race.add({
    date: {
        type: Types.Datetime, required: true, initial: true 
    },
    course: {
        type: Types.Text, required: true, initial: true 
    },
    horse: {
        type: Types.Text, required: true, initial: true 
    },
    odds: {
        type: Types.Text, required: true, initial: true
    },
	result: { 
        type: Types.Select, options: [
            { value: 'Won', label: 'Won' },
            { value: 'Placed', label: 'Placed' },
            { value: 'Did not place', label: 'Did not place' }
        ], required: true, initial: true
    }
});

Race.track = true;
Race.defaultSort = '-createdAt';
Race.defaultColumns = 'date, course, race, odds, position, createdAt';
Race.register();
