const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

const seriesSchema = new Schema({
    name: {type: String, required: true},
    characters: {type: Array, required: true},
    firstParty: {type: Boolean, required: true},
    debutYear: {type: Number, required: true},
    firstSmash: {type: Number, required: true}
})

module.exports = mongoose.model('Product', seriesSchema)