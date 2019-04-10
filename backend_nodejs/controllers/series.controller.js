const Series = require('../models/series.model')

//DONE
exports.series_list = (req, res, next) => {
    Series.find({}).sort('debutYear').select('name -_id').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//DONE
exports.member_list = (req, res, next) => {
    Series.find({name:req.params.series}).select('characters').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//list all characters that have been assigned to a series
exports.all_chars = (req, res, next) => {
    Product.find({category:req.params.cat}).sort('-date').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}

//DONE
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

//DONE
exports.person_assign = (req, res, next) => {
    Series.updateOne({name:req.body.name}, { $push: { characters: req.body.character}},
        (err) => {
        if (err) return next(err)
        res.send("Character Assigned")
    })
}

//remove person from series
exports.person_remove = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err)
        res.send('Deleted successfully')
    })
}

//DONE
exports.everything = (req, res, next) => {
    Series.find({}).sort('debutYear').exec((err,personList) => {
        if (err) return next(err)
        res.send(personList)
    })
}