var keystone = require('keystone');
var moment = require('moment');
var Types = keystone.Field.Types;

var Race = new keystone.List('Race');

Race.add({
    raceDate: {
        type: Types.Date, required: true, format: 'DD/MM/YYYY', initial: true
    },
    course: {
        type: String, required: true, initial: true
    },
    race: {
        type: String, required: true, initial: true
    },
    horse: {
        type: String, required: true, initial: true
    },
    odds: {
        type: String, required: true, initial: true
    },
	result: {
        type: Types.Select, options: [
            { value: 'Won', label: 'Won' },
            { value: 'Placed', label: 'Placed' },
            { value: 'Did not place', label: 'Did not place' }
        ], required: true, initial: true
    },
});

/**
 * Uses Schema to modify data before 
 * saving it to the database.
 * http://keystonejs.com/docs/database/#lists-plugins
 * Note: this could just be a normal function that gets called:
 * 
 * Creating a Mongoose instance method will allow you to use 
 * that method wherever you have an instance of the model so 
 * this might be useful if you were to use your model elsewhere 
 * in your application and needed that functionality.
 * https://stackoverflow.com/questions/46667631/how-to-alter-a-value-before-storing-it-to-the-database-in-keystone-js
 */
Race.schema.methods.decimalOdds = function(fraction) {
    const splitFields = fraction.split('/');
    return ((splitFields[0] / splitFields[1]) + 1).toFixed(2);
}

Race.schema.pre('save', function(next) {
    if (this.isModified('odds')) {
      this.odds = this.decimalOdds(this.odds)
    }
    next()
});

/**
 * This is to set properties without persisting
 * them to the database.
 * https://stackoverflow.com/questions/46696739/adding-a-new-property-to-mongo-after-save-in-keystone/46703599#46703599
 * http://mongoosejs.com/docs/guide.html#virtuals
 */
Race.schema.virtual('won').get(function () {
    return this.result === 'Won';
});

Race.schema.virtual('placed').get(function () {
    return this.result === 'Placed';
});

Race.schema.virtual('date').get(function () {
    return moment(this.raceDate).format('DD/MM/YYYY');
});

Race.track = true;
Race.defaultSort = 'date';
// TODO: Table column widths
// name, state|20%, author|20%, publishedDate|20%
Race.defaultColumns = 'date, course, race, horse, odds, position';
Race.register();
