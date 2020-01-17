const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoincrement = require('mongoose-sequence')(mongoose)

const planet = new Schema({
    nome: { type: String, required: true },    
	clima: { type: String },
	terreno: { type: String },
    qtdAparicoesEmFilmes: { type: Number }
},{
    collection: "planets"
});

planet.set('toObject', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.id
    }
})

planet.plugin(autoincrement, {inc_field: 'planetId'}).set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('Planet', planet);