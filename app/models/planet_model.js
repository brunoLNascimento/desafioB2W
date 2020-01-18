const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('mongoose-sequence')(mongoose)

const planet = new Schema({
    name: { type: String, required: true },    
	climate: { type: String, required: true},
	terrain: { type: String,required: true },
    films: { type: Number, required: true }
},{
    collection: "planets"
});


planet.plugin(autoincrement, {inc_field: 'planetId'}).set('toJSON', {
         transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.id
         },
    getters: true,
    virtuals: true
});

mongoose.model('Planet', planet);