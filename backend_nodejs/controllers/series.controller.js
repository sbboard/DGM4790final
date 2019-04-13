const Series = require('../models/series.model')

exports.series_list = (req, res, next) => {
    Series.find({}).sort('debutYear').select('name').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

exports.member_list = (req, res, next) => {
    Series.find({name:req.params.series}).select('characters').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

exports.all_chars = (req, res, next) => {
    Series.find({}).select('characters').exec((err,personList) => {
        if (err) return next(err)
        let bigArray = personList
        let newArray = []
        for(let i=0;i<bigArray.length;i++){
            newArray = newArray.concat(bigArray[i].characters)
        }
        res.send(newArray)
    })
}

exports.series_create = (req, res, next) => {
    let product = new Series({
        name: req.body.name,
        characters: [],
        firstParty: req.body.firstParty,
        debutYear: req.body.debutYear,
        firstSmash: req.body.firstSmash,
    })
    product.save((err) => {
        if (err){
            return next(err)
        }
        res.send('Series Created')
    })
}

exports.person_assign = (req, res, next) => {
    Series.updateOne({name:req.body.name}, { $push: { characters: req.body.character}},
        (err) => {
        if (err) return next(err)
        res.send("Character Assigned")
    })
}
exports.person_remove = (req, res, next) => {
    Series.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err)
        res.send('Deleted successfully')
    })
}

exports.everything = (req, res, next) => {
    Series.find({}).sort('debutYear').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}